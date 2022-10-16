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
import StudentService, { FieldModel, StudentModel } from "../services/StudentService";

@ApiPath({
  path: "/api/v1/students",
  name: "Студенты",
  security: { apiKeyHeader: [] },
})
@controller("/api/v1/students", "AuthMiddleware")
export class StudentController implements interfaces.Controller {
  schema = {
    type: "object",
    properties: {
      userId: { type: "string" },
    },
    required: ["userId"],
    additionalProperties: true,
  };

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

  validate: Ajv.ValidateFunction;
  validateFields: Ajv.ValidateFunction;

  constructor(@inject("StudentService") private ss: StudentService) {
    this.validate = ajv.compile(this.schema);
    this.validateFields = ajv.compile(this.schemaFields);
  }


  @ApiOperationPut({
    path: "/student/{id}",
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
  @httpPut("/student/:id")
  private async putStudent(
    @requestParam("id") id: string,
    @request() req: express.Request,
    @response() res: express.Response,
    @next() next: express.NextFunction
  ): Promise<void> {
    if (!this.validate(req.body)) {
      res.status(400);
      res.send({
        errors: this.validate.errors,
      });
      return;
    }
    const student:StudentModel = req.body;


    const updated = await this.ss.updateStudent(id, student);
    res.json(updated);
  }



  @ApiOperationPut({
    path: "/fields/{group}",
    parameters: {
      path: {
        group: {},
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
  @httpPut("/fields/:group")
  private async putFields(
    @requestParam("group") group: string,
    @request() req: express.Request,
    @response() res: express.Response,
    @next() next: express.NextFunction
  ): Promise<void> {
    if (!this.validateFields(req.body)) {
      res.send({
        errors: this.validate.errors,
      });
      return;
    }
    const fields:FieldModel[] = req.body;

    const updated = await this.ss.updateFields(group, fields);
    res.json(updated);
  }

  @ApiOperationPut({
    path: "/fields",
    parameters: {
      path: {
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
  @httpPut("/fields")
  private async putFieldsMyGroup(
    @request() req: express.Request,
    @response() res: express.Response,
    @next() next: express.NextFunction
  ): Promise<void> {
    if (!this.validateFields(req.body)) {
      res.send({
        errors: this.validate.errors,
      });
      return;
    }
    const fields:FieldModel[] = req.body;

    const group = res.locals.user.contingent.group;

    const updated = await this.ss.updateFields(group, fields);
    res.json(updated);
  }

}
