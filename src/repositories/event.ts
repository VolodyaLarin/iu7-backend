import { EventFilterModel, EventModel } from "../services/EventService";
import Repository from "./repository";

export default interface EventRepository extends Repository<EventModel> {
  getByFilter: (
    filters: EventFilterModel
  ) => Promise<EventModel[]>;
  getByFilterWithVisits: (
    filters: EventFilterModel
  ) => Promise<EventModel[]>;
  syncVisits: (id: string, users: string[]) => Promise<EventModel>;
  visit: (id: string, user: string) => Promise<EventModel>;

  getSubjects(filters: EventFilterModel): Promise<string[]>;
  getTypes(filters: EventFilterModel): Promise<string[]>;
  getSpeakers(filters: EventFilterModel): Promise<string[]>;
}
