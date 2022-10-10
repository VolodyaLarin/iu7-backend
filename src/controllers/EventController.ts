import Ajv from "ajv";
const ajv = new Ajv();

import {
  ApiOperationDelete,
  ApiOperationGet,
  ApiOperationPost,
  ApiOperationPut,
  ApiPath,
} from "swagger-express-ts";
import {
  controller,
  httpDelete,
  httpGet,
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

@ApiPath({
  path: "/event",
  name: "Мероприятия",
  security: { apiKeyHeader: [] },
})
@controller("/event", "AuthMiddleware")
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
    path: "/filter",
    parameters: {
      query: {
        q: {
          type: "json",
        },
      },
    },
    description: "Фильтрация",
    responses: {
      200: { description: "Объекты событий" },
    },
  })
  @httpGet("/filter")
  private async filterEvent(
    @request() req: express.Request,
    @response() res: express.Response,
    @next() next: express.NextFunction
  ): Promise<void> {
    let filter: EventFilterModel;
    try {
      filter = JSON.parse(String(req.query.q));
    } catch {
      filter = {};
    }
    if (!this.validateFilter(filter)) {
      res.send({
        errors: this.validate.errors,
      });
      return;
    }
    const events = await this.es.filter(filter);
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
      200: { description: "Объект события" },
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
        type: "json",
      },
    },
    description: "Обновить событие",
    responses: {
      200: { description: "Объект события" },
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
      res.send({
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
        type: "json",
      },
    },
    description: "Создать событие",
    responses: {
      200: { description: "Объект события" },
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

  @ApiOperationPost({
    path: "/{id}/syncVisits",
    parameters: {
      path: {
        id: {},
      },
      body: {
        type: "json",
      },
    },
    description: "Синхронизировать посещения",
    responses: {
      200: { description: "Объект события" },
    },
  })
  @httpPost("/:id/syncVisits")
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

  @ApiOperationPost({
    path: "/{id}/visit",
    parameters: {
      path: {
        id: {},
      },
    },
    description: "Посетить мероприятие",
    responses: {
      200: { description: "Объект события" },
    },
  })
  @httpPost("/:id/visit")
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
