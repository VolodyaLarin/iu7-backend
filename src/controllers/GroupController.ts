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

@ApiPath({
  path: "/group",
  name: "Группа",
  security: { apiKeyHeader: [] },
})
@controller("/group", "AuthMiddleware", "ContingentMiddleware")
export class GroupController implements interfaces.Controller {
  constructor(@inject("GroupService") private gs: GroupService) {}

  @ApiOperationGet({
    path: "/students",
    parameters: {},
    description: "Студенты группы",
    responses: {
      200: { description: "" },
    },
  })
  @httpGet("/students")
  private async getStudents(
    @request() req: express.Request,
    @response() res: express.Response,
    @next() next: express.NextFunction
  ): Promise<void> {
    const students = await this.gs.getStudents(
      res.locals.user.contingent.group
    );
    res.send(students);
  }

  @ApiOperationGet({
    path: "/events/{date}",
    parameters: {
      path: {
        date: {},
      },
    },
    description: "Мероприятия за день",
    responses: {
      200: { description: "" },
    },
  })
  @httpGet("/events/:date")
  private async getEvents(
    @requestParam("date") date: string,
    @request() req: express.Request,
    @response() res: express.Response,
    @next() next: express.NextFunction
  ): Promise<void> {
    const group = res.locals.user.contingent.group;
    const events = await this.gs.getEvents(group, new Date(date));
    res.send(events);
  }

  @ApiOperationPost({
    path: "/events/{date}/sync",
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
  @httpPost("/events/:date/sync")
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
    path: "/events/{date}/visits",
    parameters: {
      path: {
        date: {},
      },
    },
    description: "Мероприятия за день c посещениями",
    responses: {
      200: { description: "" },
    },
  })
  @httpGet("/events/:date/visits")
  private async getVisits(
    @requestParam("date") date: string,
    @request() req: express.Request,
    @response() res: express.Response,
    @next() next: express.NextFunction
  ): Promise<void> {
    const group = res.locals.user.contingent.group;
    const events = await this.gs.getVisits(group, new Date(date));
    res.send(events);
  }

  @ApiOperationGet({
    path: "/meta",
    parameters: {},
    description: "Метаданные о группе",
    responses: {
      200: { description: "" },
    },
  })
  @httpGet("/meta")
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
}
