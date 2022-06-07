import { inject, injectable } from "inversify";
import { Knex } from "knex";
import UserRepository from "../repositories/user";
import { UserModel } from "../services/AuthService";

@injectable()
export class SqlUserRepository implements UserRepository {
  protected knex: Knex;
  constructor(@inject("knex") knex: Knex) {
    this.knex = knex;
  }

  protected _mapUser(row): UserModel {
    if (!row) return null;

    const user: UserModel = {
      id: row.id,
      token: row.token,
      login: row.login,
      contingentLogin: row.contingentLogin,
      photo: row.photo,
      contingent: row?.group
        ? {
            login: row.contingentLogin,
            surname: row.surname,
            name: row.name,
            secname: row.secname,
            birthday: new Date(row.birthday),
            group: row.group,
          }
        : null,
    };

    return user;
  }

  async getByGroup(group: string): Promise<UserModel[]> {
    const res = await this.knex("users")
      .join("contingent", "contingent.login", "users.contingentLogin")
      .where("contingent.group", "=", group)
      .select("contingent.*", "users.*");

    return res.map(this._mapUser);
  }
  async getByLogin(login: string): Promise<UserModel> {
    const res = await this.knex("users")
      .where("login", "=", login)
      .select("*")
      .first();

    return this._mapUser(res);
  }
  async getByToken(token: string): Promise<UserModel> {
    const res = await this.knex("users")
      .where("token", "=", token)
      .select("*")
      .first();

    return this._mapUser(res);
  }

  async getById(id: string): Promise<UserModel> {
    const res = await this.knex("users")
      .where("id", "=", id)
      .select("*")
      .first();

    return this._mapUser(res);
  }

  async updateById(id: string, e: Omit<UserModel, "id">): Promise<UserModel> {
    await this.knex("users").where("id", "=", id).update(e);
    return await this.getById(id);
  }
  async deleteById(id: string): Promise<boolean> {
    const res = await this.knex("users").where("id", "=", id).delete();
    return !!res;
  }

  async create(user: Omit<UserModel, "id">): Promise<UserModel> {
    const uid = await this.knex("users").insert([user], ["*"]);

    return this._mapUser(uid[0]);
  }
}
