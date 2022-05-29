import UserRepository from "../repositories/user";
import AuthService, { UserModel } from "../services/AuthService";
import CasService from "../services/CasService";

type TokenCreator = () => string;

export default class Iu7AuthService implements AuthService {
  protected repo: UserRepository;
  protected cas: CasService;
  protected tokenCreator: TokenCreator;

  constructor(
    cas: CasService,
    repo: UserRepository,
    tokenCreator: TokenCreator
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
    if (!user) {
      user = await this.repo.create({
          login,
          token: this.tokenCreator(),
          contingentLogin: login
      });
    }

    return user.token
  }
}
