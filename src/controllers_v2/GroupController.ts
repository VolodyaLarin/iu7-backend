import {
  ApiOperationGet,
  ApiOperationPost,
  ApiOperationPut,
  ApiPath,
  SwaggerDefinitionConstant,
} from "swagger-express-ts";
import {
  controller,
  httpGet,
  httpPost,
  httpPut,
  interfaces,
  request,
  requestParam,
  response,
} from "inversify-express-utils";
import express from "express";
import { inject } from "inversify";
import GroupService from "../services/GroupService";
import StudentService, { FieldModel } from "../services/StudentService";


import "./models/MetaModel"
import './models/FieldModel'

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
    path: "/tasks/syncTimetable/{date}",
    parameters: {
      path: {
        date: {
        },
      },
    },
    description: "Синхронизировать расписание",
    responses: {
      201: { description: "Синхронизировано", model: 'C2StatusOk' },
      400: { description: "Не корректная дата", model: 'C2Error' },
      401: { description: "Не авторизован", model: 'C2Error' },
      403: { description: "Нет доступа", model: 'C2Error' },
    },
  })
  @httpPost("/tasks/syncTimetable/:date")
  private async syncEvents(
    @requestParam("date") date: string,
    @request() req: express.Request,
    @response() res: express.Response,
  ): Promise<void> {
    const group = res.locals.user.contingent.group;
    const d = new Date(date);
    if (!isFinite(d.getTime())) {
      res.status(400).send({
        errors: ['invalid date']
      });
      return;
    }
    const events = await this.gs.syncDay(group, new Date(date));
    res.status(201).send({
      status: "ok",
      events,
    });
  }
  @ApiOperationGet({
    path: "/metas",
    parameters: {},
    description: "Метаданные",
    responses: {
      200: { description: "", model: 'С2GroupMeta' },
      401: { description: "Не авторизован", model: 'C2Error' },
      403: { description: "Нет доступа", model: 'C2Error' },
    },
  })
  @httpGet("/metas")
  private async getMeta(
    @request() req: express.Request,
    @response() res: express.Response,
  ): Promise<void> {
    const group = res.locals.user.contingent.group;
    const events = await this.gs.getMeta(group);
    res.send(events);
  }

  @ApiOperationGet({
    path: "/fields",
    parameters: {},
    description: "Поля личных карточек",
    responses: {
      200: { description: "Успешно", model: 'C2Field', type:SwaggerDefinitionConstant.ARRAY },
      401: { description: "Не авторизован", model: 'C2Error' },
      403: { description: "Нет доступа", model: 'C2Error' },
    },
  })
  @httpGet("/fields")
  private async getFields(
    @request() req: express.Request,
    @response() res: express.Response,
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
        type: SwaggerDefinitionConstant.ARRAY,
        model: 'C2Field'
      },
    },
    description: "Обновить поля карточки студента",
    responses: {
      200: { description: "Поля карточки студента", model: 'C2Field', type: SwaggerDefinitionConstant.ARRAY },
      400: { description: "Ошибка валидации", model: 'C2ValidationErrors' },
      401: { description: "Не авторизован", model: 'C2Error' },
      403: { description: "Нет доступа", model: 'C2Error' },
    },
  })
  @httpPut("/fields")
  private async putFieldsMyGroup(
    @request() req: express.Request,
    @response() res: express.Response,
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
