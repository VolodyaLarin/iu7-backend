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
  params,
  request,
  requestParam,
  response,
} from "inversify-express-utils";
import express from "express";
import { inject } from "inversify";
import EventService, { EventFilterModel } from "../services/EventService";
import GroupService from "../services/GroupService";
import StudentService, { FieldModel } from "../services/StudentService";

import Ajv from "ajv";
const ajv = new Ajv();

@ApiPath({
  path: "/api/v2",
  name: "Группа",
  security: { apiKeyHeader: [] },
})
@controller("/api/v2", "AuthMiddleware", "ContingentMiddleware")
export class GroupController implements interfaces.Controller {

  schemaFields = {
    type: "array",
    items: {
      type: "object",
      properties: {
        fieldType: { type: "string" },
        fieldName: { type: "string" },
        fieldLabel: { type: "string" },
      },
      required: ["fieldType", "fieldName", "fieldLabel"],
    },
  };

  validateFields: Ajv.ValidateFunction;


  constructor(@inject("GroupService") private gs: GroupService, @inject("StudentService") private ss: StudentService) {
    this.validateFields = ajv.compile(this.schemaFields);
  }

  @ApiOperationPost({
    path: "/rpc/syncTimetable/{date}",
    parameters: {
      path: {
        date: {},
      },
    },
    description: "Синхронизировать расписание",
    responses: {
      200: { description: "" },
    },
  })
  @httpPost("/rpc/syncTimetable/:date")
  private async syncEvents(
    @requestParam("date") date: string,
    @request() req: express.Request,
    @response() res: express.Response,
    @next() next: express.NextFunction
  ): Promise<void> {
    const group = res.locals.user.contingent.group;
    const events = await this.gs.syncDay(group, new Date(date));
    res.send({
      status: "ok",
      events,
    });
  }
  @ApiOperationGet({
    path: "/metas",
    parameters: {},
    description: "Метаданные о группе",
    responses: {
      200: { description: "" },
    },
  })
  @httpGet("/metas")
  private async getMeta(
    @request() req: express.Request,
    @response() res: express.Response,
    @next() next: express.NextFunction
  ): Promise<void> {
    const group = res.locals.user.contingent.group;
    const events = await this.gs.getMeta(group);
    res.send(events);
  }

  @ApiOperationGet({
    path: "/fields",
    parameters: {},
    description: "Метаданные о полях студентов",
    responses: {
      200: { description: "" },
    },
  })
  @httpGet("/fields")
  private async getFields(
    @request() req: express.Request,
    @response() res: express.Response,
    @next() next: express.NextFunction
  ): Promise<void> {
    const group = res.locals.user.contingent.group;
    const fields = await this.gs.getStudentFields(group);
    res.send(fields);
  }

  @ApiOperationPut({
    path: "/fields",
    parameters: {
      path: {},
      body: {
        type: "json",
      },
    },
    description: "Обновить событие",
    responses: {
      200: { description: "Объект события" },
    },
  })
  @httpPut("/fields")
  private async putFieldsMyGroup(
    @request() req: express.Request,
    @response() res: express.Response,
    @next() next: express.NextFunction
  ): Promise<void> {
    if (!this.validateFields(req.body)) {
      res.send({
        errors: this.validateFields.errors,
      });
      return;
    }
    const fields: FieldModel[] = req.body;

    const group = res.locals.user.contingent.group;

    const updated = await this.ss.updateFields(group, fields);
    res.json(updated);
  }
}
