import "reflect-metadata";

import BmstuCasService from "../BmstuCasService";

describe("Cas Service", () => {
  const CLIENT_TOKEN = "CLIENT_TOKEN";
  const HttpClient = {
    async send() {
      return { body: CLIENT_TOKEN };
    },
  };

  it("Success login", async () => {
    const service = new BmstuCasService(HttpClient, () => {
      return {
        "cas:serviceResponse": {
          "cas:authenticationSuccess": {
            "cas:user": "lvn19u232",
          },
        },
      };
    });

    const res = await service.checkTicket("Hello Ticket");

    expect(res).toEqual({ status: "ok", login: "lvn19u232" });
  });

  it("Unsuccess login", async () => {
    const service = new BmstuCasService(HttpClient, () => {
      return {
        "cas:serviceResponse": {
          "cas:authenticationError": "incorrect ticket",
        },
      };
    });

    const res = await service.checkTicket("Hello Ticket");

    expect(res).toEqual({ status: "fail" });
  });

  it("Link generator", () => {
    const service = new BmstuCasService(HttpClient, () => {
      return {};
    });

    const res = service.generateLink();

    expect(res).toContain("cas/login");
    expect(res).toContain("service=");
    expect(res).toContain("?");
  });
});
