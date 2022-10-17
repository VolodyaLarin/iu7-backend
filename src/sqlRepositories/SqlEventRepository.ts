import { inject, injectable } from "inversify";
import { Knex } from "knex";
import EventRepository from "../repositories/event";
import { EventFilterModel, EventModel } from "../services/EventService";
import { VisitModel } from "../services/StatsService";

@injectable()
export default class SqlEventRepository implements EventRepository {
  knex: Knex;
  constructor(@inject("knex") knex: Knex) {
    this.knex = knex;
  }

  protected _mapEvent(row): EventModel | null {
    if (!row) return null;

    const event: EventModel = {
      id: row.id,
      date: new Date(row.date),
      group: row.group,
      speaker: row.speaker,
      type: row.type,
      subject: row.subject,
      place: row.place,
      theme: row.theme,
      description: row.description,
    };

    return event;
  }

  protected _filterEvents(filters: EventFilterModel) {
    let res = this.knex("events");
    if (filters.group) res = res.whereLike("group", filters.group);
    if (filters.subject) res = res.whereLike("subject", filters.subject);
    if (filters.type) res = res.whereLike("type", filters.type);
    if (filters?.date?.gt) res = res.where("date", ">=", filters.date.gt);
    if (filters?.date?.lt) res = res.where("date", "<=", filters.date.lt);

    return res;
  }

  async getByFilter(filters: EventFilterModel): Promise<EventModel[]> {
    const rows = await this._filterEvents(filters);

    return rows.map(this._mapEvent);
  }
  async getSubjects(filters: EventFilterModel): Promise<string[]> {
    const rows = await this._filterEvents(filters).distinct("subject");

    return rows.map((row) => row.subject);
  }
  async getTypes(filters: EventFilterModel): Promise<string[]> {
    const rows = await this._filterEvents(filters).distinct("type");

    return rows.map((row) => row.type);
  }
  async getSpeakers(filters: EventFilterModel): Promise<string[]> {
    const rows = await this._filterEvents(filters).distinct("speaker");

    return rows.map((row) => row.speaker);
  }
  async getById(id: string): Promise<EventModel> {
    const row = await this.knex("events").where("id", "=", id).first();
    const visits = await this.__visits(id);
    return Object.assign({}, this._mapEvent(row), { visits });
  }

  async create(e: Omit<EventModel, "id">): Promise<EventModel> {
    const event = (await this.knex("events").insert([e], '*'))[0];

    return await this.getById(String(event.id));
  }

  protected _mapVisit(row): VisitModel {
    return {
      id: row.id,
      userId: row.user_id,
      eventId: row.event_id,
    };
  }
  protected async __visits(eventId: string): Promise<VisitModel[]> {
    const rows = await this.knex("visits").where("event_id", eventId);

    return rows.map(this._mapVisit);
  }
  async getByFilterWithVisits(
    filters: EventFilterModel
  ): Promise<EventModel[]> {
    const events = await this.getByFilter(filters);

    return await Promise.all(
      events.map(async (event) => {
        return Object.assign({}, event, {
          visits: await this.__visits(event.id),
        });
      })
    );
  }
  async syncVisits(id: string, users: string[]): Promise<EventModel> {
    const event = await this.knex("visits").where("event_id", "=", id);
    await this.knex("visits").where('event_id', '=', id).delete();
    if (!users.length) {
      return Object.assign({}, this._mapEvent(event), {
        visits: [],
      });
    }
    const visits = await this.knex("visits").insert(
      users.map((user) => {
        return {
          user_id: user,
          event_id: id,
        };
      }), '*'
    );

    return Object.assign({}, this._mapEvent(event), {
      visits: visits.map(this._mapVisit),
    });
  }
  async visit(id: string, user: string): Promise<EventModel> {
    const event = await this.getById(id);

    const visit = await this.knex("visits").insert([
      {
        user_id: user,
        event_id: id,
      },
    ], '*');

    return Object.assign({}, event, {
      visits: visit.map(this._mapVisit),
    });
  }
  async deleteById(id: string): Promise<boolean> {
    await this.knex("events").where("id", "=", id).delete();
    return true;
  }
  async updateById(id: string, e: Omit<EventModel, "id">): Promise<EventModel> {
    await this.knex("events").where("id", "=", id).update(e);
    return await this.getById(id);
  }
}
