import Ajv from "ajv";
const ajv = new Ajv();

import {
  ApiOperationDelete,
  ApiOperationGet,
  ApiOperationPatch,
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
  next,
  request,
  requestParam,
  response,
} from "inversify-express-utils";
import express from "express";
import { inject } from "inversify";
import EventService, { EventFilterModel } from "../services/EventService";
import { SchemeFilter } from "./schemes/SchemeFilter";

import "./models/EventModel";
import { C2EventModel } from "./models/EventModel";

import "./models/ValidateErrorModel";
import { C2ValidateErrors } from "./models/ValidateErrorModel";

@ApiPath({
  path: "/events",
  name: "Мероприятия",
  security: { apiKeyHeader: [] },
})
@controller("/events", "AuthMiddleware")
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
      401: { description: "Не авторизован" },
    },
  })
  @httpGet("/")
  private async filterEvent(
    @request() req: express.Request,
    @response() res: express.Response,
    @next() next: express.NextFunction
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
      404: { description: "Не найдено" },
      403: { description: "Нет доступа" },
      401: { description: "Не авторизован" },
    },
  })
  @httpGet("/:id")
  private async getEvent(
    @requestParam("id") id: string,
    @response() res: express.Response,
    @next() next: express.NextFunction
  ): Promise<void> {
    const event = await this.es.get(id);
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
      401: { description: "Не авторизован" },
      404: { description: "Не найдено" },
    },
  })
  @httpPut("/:id")
  private async putEvent(
    @requestParam("id") id: string,
    @request() req: express.Request,
    @response() res: express.Response,
    @next() next: express.NextFunction
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
      200: { description: "Объект события", model: "C2EventModel" },
      400: { description: "Ошибка валидации", model: "C2ValidateErrors" },
      401: { description: "Не авторизован" },
    },
  })
  @httpPost("/")
  private async createEvent(
    @request() req: express.Request,
    @response() res: express.Response,
    @next() next: express.NextFunction
  ): Promise<void> {
    if (!this.validate(req.body)) {
      res.send({
        errors: this.validate.errors,
      });
      return;
    }

    const event = await this.es.create(
      Object.assign({}, req.body, { date: new Date(req.body.date) })
    );
    res.json(event);
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
      200: { description: "Объект события" },
    },
  })
  @httpDelete("/:id")
  private async deleteEvent(
    @requestParam("id") id: string,
    @request() req: express.Request,
    @response() res: express.Response,
    @next() next: express.NextFunction
  ): Promise<void> {
    await this.es.delete(id);
    res.json({});
  }

  @ApiOperationPut({
    path: "/{id}/visits",
    parameters: {
      path: {
        id: {},
      },
      body: {
        type: SwaggerDefinitionConstant.ARRAY,
        model: "C2PatchVisitModel",
      },
    },
    description: "Синхронизировать посещения",
    responses: {
      200: { description: "Объект события" },
      400: { description: "Ошибка валидации", model: "C2ValidateErrors" },
      401: { description: "Не авторизован" },
      404: { description: "Не найдено" },
    },
  })
  @httpPut("/:id/visits")
  private async syncVisits(
    @requestParam("id") id: string,
    @request() req: express.Request,
    @response() res: express.Response,
    @next() next: express.NextFunction
  ): Promise<void> {
    if (!Array.isArray(req.body)) {
      res.status(400).send({
        errors: ["body should be array of ids"],
      });
      return;
    }
    await this.es.syncVisits(id, req.body);
    res.json({ status: "ok" });
  }

  @ApiOperationPatch({
    path: "/{id}/visits",
    parameters: {
      path: {
        id: {},
      },
    },
    description: "Посетить мероприятие",
    responses: {
      200: { description: "Добавлено" },
      401: { description: "Не авторизован" },
      404: { description: "Не найдено" },
    },
  })
  @httpPatch("/:id/visits")
  private async visit(
    @requestParam("id") id: string,
    @request() req: express.Request,
    @response() res: express.Response,
    @next() next: express.NextFunction
  ): Promise<void> {
    await this.es.addVisit(id, res.locals?.user?.id);
    res.json({ status: "ok" });
  }
}
