import Ajv from "ajv";
const ajv = new Ajv();

import {
  ApiOperationGet,
  ApiOperationPatch,
  ApiPath,
  SwaggerDefinitionConstant,
} from "swagger-express-ts";
import {
  controller,
  httpGet,
  httpPatch,
  interfaces,
  next,
  request,
  requestParam,
  response,
} from "inversify-express-utils";
import express from "express";
import { inject } from "inversify";

import StudentService, {
  StudentModel,
} from "../services/StudentService";
import GroupService from "../services/GroupService";

@ApiPath({
  path: "/api/v2/students",
  name: "Студенты",
  security: { apiKeyHeader: [] },
})
@controller("/api/v2/students", "AuthMiddleware")
export class StudentController implements interfaces.Controller {
  schema = {
    type: "object",
    properties: {
      userId: { type: "string" },
    },
    required: ["userId"],
    additionalProperties: true,
  };

  validate: Ajv.ValidateFunction;

  constructor(
    @inject("StudentService") private ss: StudentService,
    @inject("GroupService") private gs: GroupService
  ) {
    this.validate = ajv.compile(this.schema);
  }

  @ApiOperationGet({
    path: "/",
    parameters: {},
    description: "Студенты группы",
    responses: {
      200: { description: "", model:'C2UserModel', type: SwaggerDefinitionConstant.ARRAY },
      401: { description: "Не авторизован", model: 'C2Error' },
      403: { description: "Нет доступа", model: 'C2Error' },
    },
  })
  @httpGet("/")
  private async getStudents(
    @request() req: express.Request,
    @response() res: express.Response,
  ): Promise<void> {
    const students = await this.gs.getStudents(
      res.locals.user.contingent.group
    );
    res.send(students);
  }

  @ApiOperationPatch({
    path: "/{id}",
    parameters: {
      path: {
        id: {},
      },
      body: {
        type: "json",
        description: 'Произвольные поля типа строка'
      },
    },
    description: "Обновить карточку студента",
    responses: {
      200: { description: "Объект события", model: 'C2StatusOk' },
      400: { description: "Ошибка валидации", model: 'C2ValidateErrors' },
      401: { description: "Не авторизован", model: 'C2Error' },
      404: { description: "Не найдено", model: 'C2Error' },
      403: { description: "Нет доступа", model: 'C2Error' },
    },
  })
  @httpPatch("/:id")
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
    const student: StudentModel = req.body;
    const updated = await this.ss.updateStudent(id, student);
    res.json({status: 'ok'});
  }
}
