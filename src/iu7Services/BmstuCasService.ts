import { inject, injectable } from "inversify";
import CasService, { CasResultModel } from "../services/CasService";
import config from "config"

export interface CasHttpClient {
  send(
    url: string,
    body?: string
  ): Promise<{
    body: string;
  }>;
}
export type CasXmlParser = (input: string) => Record<string, unknown>;

@injectable()
export default class BmstuCasService implements CasService {
  protected client: CasHttpClient;
  protected xmlParser?: CasXmlParser;
  protected casUrl:string;
  protected redirectUrl:string;

  constructor(
    @inject("CasHttpClient") client: CasHttpClient,
    @inject("CasXmlParser") xmlParser: CasXmlParser | null = null
  ) {
    this.client = client;
    this.xmlParser = xmlParser;
    this.casUrl = config.get("cas.casUrl");
    this.redirectUrl = config.get("cas.redirectUrl");

  }

  generateLink() {
    return this.casUrl + "/cas/login?service=" + this.redirectUrl;
  }

  async checkTicket(ticket: string): Promise<CasResultModel> {
    const res = await this.client.send(
      this.casUrl + "/cas/proxyValidate?service=" + this.redirectUrl + "&ticket=" +
        ticket
    );

    if (!res.body) {
      throw "Service error";
    }

    const answer = this.xmlParser ? this.xmlParser(res.body) : res.body;

    if (answer["cas:serviceResponse"]["cas:authenticationSuccess"]) {
      const login = answer["cas:serviceResponse"]["cas:authenticationSuccess"]["cas:user"];

      if (!login) {
        throw "Service Error";
      }

      return {
        status: "ok",
        login: login,
      };
    } else {
      return {
        status: "fail",
      };
    }
  }
}
