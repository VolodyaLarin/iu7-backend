import { UserModel } from "./AuthService";
import { EventModel } from "./EventService";


export interface GroupMetaModel {
    subjects: string[];
    types: string[];
    speakers: string[];
}
export default interface GroupService {
    getEvents: (group:string, date: Date) => Promise<EventModel[]>
    getVisits: (group:string, date: Date) => Promise<EventModel[]>
    getStudents: (group:string, date: Date) => Promise<UserModel[]>
    getStudentFields: (group:string, date: Date) => Promise<GroupMetaModel>
    syncDay: (group:string, date:Date) => Promise<EventModel[]>;
}