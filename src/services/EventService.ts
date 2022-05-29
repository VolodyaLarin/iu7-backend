import { VisitModel } from "./StatsService";

export interface EventModel {
    id?: string;
    date:Date;
    group: string;
    speaker?: string;
    type?: string;
    subject: string;
    place?: string;
    theme: string;
    description?: string;
    visits?: VisitModel[];
}

export interface EventFilterModel {
    date?: {
        gt?: Date,
        lt?: Date
    },
    subject?: string,
    type?: string,
    group?: string
}

export default interface EventService {
    create: (event:EventModel)=> Promise<EventModel>;
    update: (event:EventModel)=> Promise<EventModel>;
    delete: (eventId: string)=> Promise<void>;
    filter: (filter:EventFilterModel)=> Promise<EventModel[]>;
    syncVisits: (eventId:string, userIds: string[]) => Promise<void>;
    addVisit: (eventId:string, userId: string) => Promise<void>;
}