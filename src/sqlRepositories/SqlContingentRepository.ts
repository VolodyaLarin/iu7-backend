import { inject, injectable } from "inversify";
import { Knex } from "knex";
import ContingentRepository, {
  ContingentModel,
} from "../repositories/contingent";

@injectable()
export class SqlContingentRepository implements ContingentRepository {
  knex: Knex;
  constructor(@inject("knex") knex: Knex) {
    this.knex = knex;
  }
  _mapContingent(row): ContingentModel | null {
    if (!row) return null;

    return {
      id: row.id,
      login: row.login,
      surname: row.surname,
      name: row.name,
      secname: row.secname,
      group: row.group,
      birthday: row.birthday,
    };
  }
  async getByLogin(login: string): Promise<ContingentModel> {
    const row = await this.knex("contingent").whereLike("login", login).first();
    return this._mapContingent(row);
  }
  async getByGroup(group: string): Promise<ContingentModel[]> {
    const rows = await this.knex("contingent").whereLike("group", group);

    return rows.map(this._mapContingent);
  }
  async getById(id: string) : Promise<ContingentModel> {
    const row = await this.knex("contingent").where("id", id).first();

    return this._mapContingent(row);
  }

  async deleteById(id: string): Promise<boolean> {
    const row = await this.knex("contingent").where("id", id).delete();

    return row >= 1;
  }

  async updateById (
    id: string,
    e: Omit<ContingentModel, "id">
  ):Promise<ContingentModel> {
    await this.knex("contingent").where("id", id).update(e);

    return this.getById(id);
  }
  async create(e: Omit<ContingentModel, "id">) : Promise<ContingentModel> {
    const rows = this.knex("contingent").insert(e);

    return this._mapContingent(rows[0]);
  }
}
