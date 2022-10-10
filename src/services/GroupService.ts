import { UserModel } from "./AuthService";
import { EventModel } from "./EventService";
import { FieldModel } from "./StudentService";


export interface GroupMetaModel {
    subjects: string[];
    types: string[];
    speakers: string[];
}
export default interface GroupService {
    getEvents: (group:string, date: Date) => Promise<EventModel[]>
    getVisits: (group:string, date: Date) => Promise<EventModel[]>
    getAllVisits: (group:string) => Promise<EventModel[]>
    getStudents: (group:string) => Promise<UserModel[]>
    getMeta: (group:string) => Promise<GroupMetaModel>
    getStudentFields: (group:string) => Promise<FieldModel[]>
    syncDay: (group:string, date:Date) => Promise<EventModel[]>;
}