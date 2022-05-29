import { UserModel } from "./AuthService";

export interface VisitModel {
    userId: string;
    eventId: string;
    user?: UserModel;
}

export default interface StatsService {
    visitScore: ()=> number
    visitsByGroup: ()=> number
}