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
import AuthService from "../services/AuthService";
import GroupService from "../services/GroupService";

@ApiPath({
  path: "/cas",
  name: "Авторизация",
})
@controller("/cas")
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
    path: "/auth",
    description: "Проверка токена",
    parameters: {
      query: {
        ticket: {},
      },
    },
    responses: {
      200: { description: "Страница с утсновкой" },
    },
  })
  @httpGet("/auth")
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

    return res.redirect("http://localhost:8080/savetoken?api_token=" + token);
    return res.send(`<script>
    ${token}
    </script>`);
  }

  @ApiOperationGet({
    path: "/me",
    description: "Текущий пользователь",
    parameters: {
      query: {},
    },
    responses: {
      200: { description: "" },
    },
    security: { apiKeyHeader: [] },
  })
  @httpGet("/me", "AuthMiddleware")
  async me(
    @request() req: express.Request,
    @response() res: express.Response,
    @next() next: express.NextFunction
  ) {
    if (res.locals.user?.contingent?.group) {
      const x = await this.gs.getStudents(res.locals.user.contingent.group);

      return res.send(
        Object.assign(
          {},
          res.locals.user,
          x.find((xx) => xx.id == res.locals.user.id)
        )
      );
    }

    return res.send(res.locals.user)
   
  }
}
