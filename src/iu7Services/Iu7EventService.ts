import { inject, injectable } from "inversify";
import EventRepository from "../repositories/event";
import EventService, {
  EventFilterModel,
  EventModel,
} from "../services/EventService";

@injectable()
export default class Iu7EventService implements EventService {
  protected repo: EventRepository;

  constructor(@inject("EventRepository") repo: EventRepository) {
    this.repo = repo;
  }
  get(id: string): Promise<EventModel> {
    return this.repo.getById(id);
  }
  async create(event: EventModel): Promise<EventModel> {
    return await this.repo.create(event);
  }
  async update(event: EventModel): Promise<EventModel> {
    return await this.repo.updateById(event.id, event);
  }
  async delete(eventId: string): Promise<void> {
    await this.repo.deleteById(eventId);
  }

  async filter(filter: EventFilterModel): Promise<EventModel[]> {
    return await this.repo.getByFilter(filter);
  }
  async syncVisits(eventId: string, userIds: string[]): Promise<void> {
    await this.repo.syncVisits(eventId, userIds);
  }
  async addVisit(eventId: string, userId: string): Promise<void> {
    await this.repo.visit(eventId, userId);
  }
}
