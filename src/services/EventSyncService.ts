import { EventModel } from "./EventService";


export default interface EventSyncService {
  getEvents: (group: string, date: Date) => Promise<EventModel[]>;
}
