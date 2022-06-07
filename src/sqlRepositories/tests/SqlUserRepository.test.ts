import "reflect-metadata";

import knex, { Knex } from "knex";
import UserRepository from "../../repositories/user";
import { SqlUserRepository } from "../SqlUserRepository";
import knexConfig from "./knexConfig";


describe("Iu7UserRepository.ts", () => {
  let knexInstance: Knex;

  let repo: UserRepository;

  beforeAll(async () => {
    knexInstance = knex(knexConfig);
    repo = new SqlUserRepository(knexInstance);

    await knexInstance.migrate.rollback({}, true);
    await knexInstance.migrate.latest();

    const users = [
      {
        token: "token1",
        login: "lvn19u232",
        contingentLogin: "19У232",
      },
      {
        token: "token2",
        login: "lvn19u233",
        contingentLogin: "19У233",
      },
      {
        token: "token3",
        login: "lvn19u234",
        contingentLogin: "19У234",
      },
    ];

    await knexInstance("users").insert(users);

    await knexInstance("contingent").insert([
      {
        surname: "Larin",
        name: "Larin",
        secname: "Larin",
        group: "ИУ7-64Б",
        login: "19У232",
        birthday: new Date("2020-03-03")
      },
      {
        surname: "Merin",
        name: "Merin",
        secname: "Merin",
        group: "ИУ7-63Б",
        login: "19У233",
        birthday: new Date("2020-03-03")
      },
      {
        surname: "Nikitina",
        name: "Nikitina",
        secname: "Nikitina",
        group: "ИУ7-64Б",
        login: "19У234",
        birthday: new Date("2020-03-03")
      },
    ]);
  });

  it("add user", async () => {
    const user = await repo.create({
      token: "new_token",
      login: "new_login",
      contingentLogin: "new_contingentLogin",
    });

    expect(user.id).toEqual(4);
  });

  it("get group", async () => {
    const users = await repo.getByGroup("ИУ7-64Б")

    expect(users.length).toEqual(2);
  });

  afterAll(async ()=>{
      knexInstance.destroy()
  })
});
