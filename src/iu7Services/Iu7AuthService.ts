import { inject, injectable } from "inversify";
import UserRepository from "../repositories/user";
import AuthService, { UserModel } from "../services/AuthService";
import CasService from "../services/CasService";
import { reverseTransliterate } from "./TranslitService";


export type TokenCreator = () => string;

@injectable()
export default class Iu7AuthService implements AuthService {
  protected repo: UserRepository;
  protected cas: CasService;
  protected tokenCreator: TokenCreator;

  constructor(
    @inject("CasService") cas: CasService,
    @inject("UserRepository") repo: UserRepository,
    @inject("TokenCreator") tokenCreator: TokenCreator,
  ) {
    this.repo = repo;
    this.cas = cas;
    this.tokenCreator = tokenCreator;
  }

  async auth(bearer: string): Promise<UserModel> {
    return await this.repo.getByToken(bearer);
  }
  async checkTicket(ticket: string): Promise<string> {
    const casRes = await this.cas.checkTicket(ticket);
    
    if (casRes.status !== "ok") {
      return null;
    }
    const login = casRes.login;

    let user = await this.repo.getByLogin(login);

    const contingentLogin = reverseTransliterate(
      login.substring(login.search(/[0-9]/))
    ).toUpperCase();
    
    if (!user) {
      user = await this.repo.create({
        login,
        token: this.tokenCreator(),
        contingentLogin,
      });
    }

    return user.token;
  }
}
