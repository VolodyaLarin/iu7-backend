import Ajv from "ajv";
const ajv = new Ajv();

import {
  ApiOperationDelete,
  ApiOperationGet,
  ApiOperationPost,
  ApiOperationPut,
  ApiPath,
  SwaggerDefinitionConstant,
} from "swagger-express-ts";
import {
  controller,
  httpDelete,
  httpGet,
  httpPatch,
  httpPost,
  httpPut,
  interfaces,
  request,
  requestParam,
  response,
} from "inversify-express-utils";
import express from "express";
import { inject } from "inversify";
import EventService from "../services/EventService";
import { SchemeFilter } from "./schemes/SchemeFilter";

import "./models/EventModel";
import "./models/ValidateErrorModel";
import "./models/ErrorModel";

@ApiPath({
  path: "/api/v2/events",
  name: "Мероприятия",
  security: { apiKeyHeader: [] },
})
@controller("/api/v2/events", "AuthMiddleware")
export class EventController implements interfaces.Controller {
  schema = {
    type: "object",
    properties: {
      date: { type: "string" },
      group: { type: "string" },
      speaker: { type: "string" },
      type: { type: "string" },
      subject: { type: "string" },
      place: { type: "string" },
      theme: { type: "string" },
      description: { type: "string" },
    },
    required: ["date", "type", "subject"],
    additionalProperties: false,
  };

  schemaFilter = SchemeFilter;

  validate: Ajv.ValidateFunction;
  validateFilter: Ajv.ValidateFunction;

  constructor(@inject("EventService") private es: EventService) {
    this.validate = ajv.compile(this.schema);
    this.validateFilter = ajv.compile(this.schemaFilter);
  }

  @ApiOperationGet({
    path: "/",
    parameters: {
      query: {
        date_gt: { type: SwaggerDefinitionConstant.STRING },
        date_lt: { type: SwaggerDefinitionConstant.STRING },
        type: { type: SwaggerDefinitionConstant.STRING },
      },
    },
    description: "Фильтрация",
    responses: {
      200: {
        description: "Объекты событий",
        model: "C2EventModel",
        type: SwaggerDefinitionConstant.ARRAY,
      },
      401: { description: "Не авторизован", model: "C2Error", },
    },
  })
  @httpGet("/")
  private async filterEvent(
    @request() req: express.Request,
    @response() res: express.Response,
  ): Promise<void> {
    const group = res.locals.user?.contingent?.group;

    const events = await this.es.filter({
      date:
        req.query.date_gt && req.query.date_lt
          ? {
            gt: new Date(String(req.query.date_gt)),
            lt: new Date(String(req.query.date_lt)),
          }
          : undefined,
      type: req.query.type ? String(req.query.type) : undefined,
      group,
    });
    res.json(events);
  }

  @ApiOperationGet({
    path: "/{id}",
    parameters: {
      path: {
        id: {},
      },
    },
    description: "Получить событие",
    responses: {
      200: { description: "Объект события", model: "C2EventModel" },
      404: { description: "Не найдено", model: "C2Error" },
      403: { description: "Нет доступа", model: "C2Error" },
      401: { description: "Не авторизован", model: "C2Error" },
    },
  })
  @httpGet("/:id")
  private async getEvent(
    @requestParam("id") id: string,
    @response() res: express.Response,
  ): Promise<void> {
    const event = await this.es.get(id);
    if (!event.id) {
      res.status(404).json({ errors: ['not found'] })
      return;
    }
    res.json(event);
  }

  @ApiOperationPut({
    path: "/{id}",
    parameters: {
      path: {
        id: {},
      },
      body: {
        model: "C2PostEventModel",
      },
    },
    description: "Обновить событие",
    responses: {
      200: { description: "Объект события", model: "C2EventModel" },
      400: { description: "Ошибка валидации", model: "C2ValidateErrors" },
      401: { description: "Не авторизован", model: "C2Error" },
      404: { description: "Не найдено", model: "C2Error" },
    },
  })
  @httpPut("/:id")
  private async putEvent(
    @requestParam("id") id: string,
    @request() req: express.Request,
    @response() res: express.Response,
  ): Promise<void> {
    if (!this.validate(req.body)) {
      res.status(400).send({
        errors: this.validate.errors,
      });
      return;
    }

    const event = await this.es.update(
      Object.assign({}, req.body, { id, date: new Date(req.body.date) })
    );
    if (!event.id) {
      res.status(404).json({ errors: ['not found'] })
      return;
    }

    res.json(event);
  }

  @ApiOperationPost({
    path: "/",
    parameters: {
      body: {
        model: "C2PostEventModel",
      },
    },
    description: "Создать событие",
    responses: {
      201: { description: "Объект события", model: "C2EventModel" },
      400: { description: "Ошибка валидации", model: "C2ValidateErrors" },
      401: { description: "Не авторизован", model: "C2Error" },
    },
  })
  @httpPost("/")
  private async createEvent(
    @request() req: express.Request,
    @response() res: express.Response,
  ): Promise<void> {
    if (!this.validate(req.body)) {
      res.status(400).send({
        errors: this.validate.errors,
      });
      return;
    }

    const event = await this.es.create(
      Object.assign({}, req.body, { date: new Date(req.body.date) })
    );
    res.status(201).json(event);
  }

  @ApiOperationDelete({
    path: "/{id}",
    parameters: {
      path: {
        id: {},
      },
    },
    description: "Удалить событие",
    responses: {
      200: { description: "Удалено", model: 'C2StatusOk' },
      401: { description: "Не авторизован", model: 'C2Error' },
      403: { description: "Нет доступа", model: 'C2Error' },
    },
  })
  @httpDelete("/:id")
  private async deleteEvent(
    @requestParam("id") id: string,
    @request() req: express.Request,
    @response() res: express.Response,
  ): Promise<void> {
    await this.es.delete(id);
    res.json({
      status: 'ok'
    });
  }

  @ApiOperationPut({
    path: "/{id}/visits",
    parameters: {
      path: {
        id: {},
      },
      body: {
        type: SwaggerDefinitionConstant.ARRAY,
        model: SwaggerDefinitionConstant.STRING
      },
    },
    description: "Синхронизировать посещения",
    responses: {
      200: { description: "Синхронизировано", model: 'C2StatusOk' },
      400: { description: "Ошибка валидации", model: "C2ValidateErrors" },
      401: { description: "Не авторизован", model: 'C2Error' },
      404: { description: "Не найдено", model: 'C2Error' },
    },
  })
  @httpPut("/:id/visits")
  private async syncVisits(
    @requestParam("id") id: string,
    @request() req: express.Request,
    @response() res: express.Response,
  ): Promise<void> {
    if (!Array.isArray(req.body)) {
      res.status(400).send({
        errors: ["body should be array of ids"],
      });
      return;
    }
    const visits = [...new Set(req.body
      .map((x) => parseInt(x))
      .filter((x) => !!x).map((x) => String(x)))]

    const event = await this.es.get(id);
    if (!event.id) {
      res.status(404).json({ errors: ['not found'] })
      return;
    }

    await this.es.syncVisits(id, visits);
    res.json({ status: "ok" });
  }

  @ApiOperationPost({
    path: "/{id}/visits",
    parameters: {
      path: {
        id: {},
      },
    },
    description: "Посетить мероприятие",
    responses: {
      201: { description: "Добавлено посещение", model: 'C2StatusOk' },
      401: { description: "Не авторизован", model: 'C2Error' },
      404: { description: "Не найдено", model: 'C2Error' },
    },
  })
  @httpPost("/:id/visits")
  private async visit(
    @requestParam("id") id: string,
    @request() req: express.Request,
    @response() res: express.Response,
  ): Promise<void> {
    const event = await this.es.get(id);
    if (!event.id) {
      res.status(404).json({ errors: ['not found'] })
      return;
    }

    await this.es.addVisit(id, res.locals?.user?.id);
    res.json({ status: "ok" });
  }
}
