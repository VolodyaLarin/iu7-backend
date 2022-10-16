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
import StudentService, {
  FieldModel,
  StudentModel,
} from "../services/StudentService";
import StatsService from "../services/StatsService";
import { SchemeFilter } from "./schemes/SchemeFilter";

@ApiPath({
  path: "/api/v2/rpc",
  name: "Статистика",
  security: { apiKeyHeader: [] },
})
@controller("/api/v2/rpc", "AuthMiddleware")
export class StatsController implements interfaces.Controller {
  validate: Ajv.ValidateFunction;

  constructor(@inject("StatsService") private ss: StatsService) {
    this.validate = ajv.compile(SchemeFilter);
  }

  @ApiOperationGet({
    path: "/getMyScore",
    parameters: {},
    description: "Рейтинг посещаемости",
    responses: {
      200: { description: "" },
    },
  })
  @httpGet("/getMyScore")
  private async score(
    @request() req: express.Request,
    @response() res: express.Response,
    @next() next: express.NextFunction
  ): Promise<void> {
    const userId = res.locals.user.id;

    const score = await this.ss.visitScore(userId);
    res.json(score);
  }

  @ApiOperationGet({
    path: "/getGroupScore/{group}",
    parameters: {
      path: {
        group: {},
      },
      query: {
        q: {
          type: "json",
        },
      },
    },
    description: "Статистика по группе",
    responses: {
      200: { description: "Объект события" },
    },
  })
  @httpGet("/getGroupScore/:group")
  private async putFields(
    @requestParam("group") group: string,
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
    if (!this.validate(filter)) {
      res.status(400).send({
        errors: this.validate.errors,
      });
      return;
    }

    const stats = await this.ss.visitsByGroup(group, filter);

    res.send(stats);
  }
}
