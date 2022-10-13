import { inject, injectable } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import express from "express";
import AuthService, { UserModel } from "../services/AuthService";


@injectable()
export class AuthMiddleware extends BaseMiddleware {
  @inject("AuthService") private auth: AuthService;

  public async handler(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (!req.headers.authorization) {
      return res.status(401).send({
        errors: ["no-authorization-token"],
      });
    }

    const token = req.headers.authorization.replace("bearer", "").replace("Bearer", "").trim();

    const user = await this.auth.auth(token);
    
    if (!user) {
        return res.status(403).send({
            errors: ["incorrect token"],
          }); 
    }
    res.locals.user = user;

    next();
  }
}
