import { ApiOperationGet, ApiPath } from "swagger-express-ts";
import {
  controller,
  httpGet,
  interfaces,
  next,
  request,
  response,
} from "inversify-express-utils";
import express from "express";
import CasService from "../services/CasService";
import { inject } from "inversify";
import AuthService, { UserModel } from "../services/AuthService";
import GroupService from "../services/GroupService";

import "./models/UserModel"
import { C2UserModel } from "./models/UserModel";

@ApiPath({
  path: "/api/v2/auth",
  name: "Авторизация",
})
@controller("/api/v2/auth")
export class AuthController implements interfaces.Controller {
  constructor(
    @inject("CasService") private cas: CasService,
    @inject("AuthService") private auth: AuthService,
    @inject("GroupService") private gs: GroupService
  ) {}
  @ApiOperationGet({
    description: "Переход к системе Cas",
    responses: {
      302: { description: "Редирект" },
    },
  })
  @httpGet("/")
  async index(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    res.redirect(this.cas.generateLink());
  }

  @ApiOperationGet({
    path: "/cas_callback",
    description: "Проверка токена",
    parameters: {
      query: {
        ticket: {},
      },
    },
    responses: {
      302: { description: "Редирект на SPA" },
    },
  })
  @httpGet("/cas_callback")
  async token_check(
    @request() req: express.Request,
    @response() res: express.Response,
    @next() next: express.NextFunction
  ) {
    const ticket = String(req.query.ticket);

    const token = await this.auth.checkTicket(ticket);

    if (!token) {
      res.status(403);
      res.send(`Неверный тикет`);
      return;
    }

    return res.send(token);
    return res.redirect("http://localhost:8080/savetoken?api_token=" + token);
  }

  @ApiOperationGet({
    path: "/user",
    description: "Текущий пользователь",
    parameters: {
      query: {},
    },
    responses: {
      200: { description: "", model:"C2UserModel" },
      401: { description: "Not authorized" },
    },
    security: { apiKeyHeader: [] },
  })
  @httpGet("/user", "AuthMiddleware")
  async me(
    @request() req: express.Request,
    @response() res: express.Response,
    @next() next: express.NextFunction
  ) {

    let user:C2UserModel | null = null 

    if (!res.locals.user?.contingent?.group) {
      user = res.locals.user as UserModel
    }
    else {
      const x = await this.gs.getStudents(res.locals.user.contingent.group);

      return res.send(
        Object.assign({}, res.locals.user, {
          student: x.find((xx) => xx.id == res.locals.user.id)?.student,
        })
      );
    }
    
    return res.send(user)
  }
}
