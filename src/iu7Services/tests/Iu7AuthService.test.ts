import "reflect-metadata";

import UserRepository from "../../repositories/user";
import { UserModel } from "../../services/AuthService";
import CasService, { CasResultModel } from "../../services/CasService";
import Iu7AuthService from "../Iu7AuthService";

describe("Auth Service", () => {
  const NEW_USER_CORRECT_TOKEN = "NEW_USER_CORRECT_TOKEN";
  const CORRECT_TOKEN = "CORRECT_TOKEN";
  const INCORRECT_TOKEN = "INCORRECT_TOKEN";

  const NEW_USER_CORRECT_TICKET = "NEW_CORRECT_TICKET";
  const CORRECT_TICKET = "CORRECT_TICKET";
  const INCORRECT_TICKET = "INCORRECT_TICKET";

  const LOGIN = "LOGIN";
  const NEW_LOGIN = "NEW_LOGIN";

  const CORRECT_USER: UserModel = {
    id: "1",
    token: CORRECT_TOKEN,
    login: LOGIN,
    contingentLogin: LOGIN,
  };

  const cas: CasService = {
    generateLink: function (): string {
      throw new Error("Function not implemented.");
    },
    checkTicket: async function (ticket: string): Promise<CasResultModel> {
      if (ticket == CORRECT_TICKET)
        return {
          status: "ok",
          login: LOGIN,
        };
      if (ticket == NEW_USER_CORRECT_TICKET)
        return {
          status: "ok",
          login: NEW_LOGIN,
        };
      return {
        status: "fail",
      };
    },
  };
  const tokenCreator = () => NEW_USER_CORRECT_TOKEN;
  const repo: UserRepository = {
    getByGroup: function (): Promise<UserModel[]> {
      throw new Error("Function not implemented.");
    },
    getByLogin: async function (login: string): Promise<UserModel> {
      if (login != LOGIN) return null;
      return CORRECT_USER;
    },
    getByToken: async function (token: string): Promise<UserModel | null> {
      if (token != CORRECT_TOKEN) return null;
      return CORRECT_USER;
    },
    getById: function (): Promise<UserModel> {
      throw new Error("Function not implemented.");
    },
    updateById: function (): Promise<UserModel> {
      throw new Error("Function not implemented.");
    },
    deleteById: function (): Promise<boolean> {
      throw new Error("Function not implemented.");
    },
    create: async function (user: Omit<UserModel, "id">): Promise<UserModel> {
      expect(user.token).toEqual(NEW_USER_CORRECT_TOKEN);
      expect(user.login).toEqual(NEW_LOGIN);

      return Object.assign({}, user, {
        id: "1",
      });
    },
  };

  it("Check auth with correct token", async () => {
    const service = new Iu7AuthService(cas, repo, tokenCreator);

    const res = await service.auth(CORRECT_TOKEN);

    expect(res).toEqual(CORRECT_USER);
  });

  it("Check auth with incorrect token", async () => {
    const service = new Iu7AuthService(cas, repo, tokenCreator);

    const res = await service.auth(INCORRECT_TOKEN);

    expect(res).toBeNull();
  });

  it("Check auth with correct ticket and exist user", async () => {
    const service = new Iu7AuthService(cas, repo, tokenCreator);

    const res = await service.checkTicket(CORRECT_TICKET);

    expect(res).toEqual(CORRECT_TOKEN);
  });

  it("Check auth with correct ticket and new user", async () => {
    const service = new Iu7AuthService(cas, repo, tokenCreator);

    const res = await service.checkTicket(NEW_USER_CORRECT_TICKET);

    expect(res).toEqual(NEW_USER_CORRECT_TOKEN);
  });

  it("Check auth with incorrect ticket", async () => {
    const service = new Iu7AuthService(cas, repo, tokenCreator);

    const res = await service.checkTicket(INCORRECT_TICKET);

    expect(res).toBeNull();
  });
});
