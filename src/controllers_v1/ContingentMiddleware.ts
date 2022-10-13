import { inject, injectable } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import express from "express";
import AuthService, { UserModel } from "../services/AuthService";
import ContingentRepository from "../repositories/contingent";


@injectable()
export class ContingentMiddleware extends BaseMiddleware {
  @inject("ContingentRepository") private contingent: ContingentRepository;

  public async handler(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const contingent = await this.contingent.getByLogin(res.locals?.user?.contingentLogin)
    
    if (!contingent) {
        return res.status(403).send({
            errors: ["no contingent entry"],
            user: res.locals.user
          }); 
    }
    res.locals.user.contingent = contingent;

    next();
  }
}
