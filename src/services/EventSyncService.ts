import { EventModel } from "./EventService";

export interface EventSyncModel {
  firstDayOfSemester: Date;
  oddWeekEvents: EventModel[][];
  evenWeekEvents: EventModel[][];
}
export default interface EventSyncService {
  getTimetable: (group: string) => Promise<EventSyncModel>;
  getEvents: (group: string, date: Date) => Promise<EventModel[]>;
}
