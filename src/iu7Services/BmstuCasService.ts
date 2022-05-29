import CasService, { CasResultModel } from "../services/CasService";

interface CasHttpClient {
  send(url: string, body?: string): Promise<{
      body: ReadableStream<Uint8Array> | string
  }>;
}
type CasXmlParser = (
  input: string | ReadableStream<Uint8Array>
) => Record<string, unknown>;


export default class BmstuCasService implements CasService {
  protected client: CasHttpClient;
  protected xmlParser: CasXmlParser;

  constructor(client: CasHttpClient, xmlParser:CasXmlParser) {
    this.client = client;
    this.xmlParser = xmlParser
  }

  generateLink() {
    return "https://proxy.bmstu.ru:8443/cas/login?service=https://xn--7-otb7a.xn--p1ai/api/cas";
  }

  async checkTicket(ticket: string): Promise<CasResultModel> {
    const res = await this.client.send(
      "https://proxy.bmstu.ru:8443/cas/proxyValidate?service=https://xn--7-otb7a.xn--p1ai/api/cas&ticket=" +
        ticket
    );

    if (!res.body) {
      throw "Service error";
    }

    const answer = this.xmlParser(res.body);

    if (answer["cas:authenticationSuccess"]) {
      const login = answer["cas:authenticationSuccess"]["cas:user"];

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
