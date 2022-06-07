import { UserModel } from "./AuthService";
import { EventFilterModel } from "./EventService";

export interface VisitModel {
  id?: string;
  userId: string;
  eventId: string;
  user?: UserModel;
}

export interface StatsModel {
  type: string;
  total: number;
  students: {
    visited: number;
    userId: string;
    name: string;
  }[];
}
export interface StatsScoreModel {
  total: number;
  visited: number;
}

export default interface StatsService {
  visitScore: (studentId: string, days?: number) => Promise<StatsScoreModel>;
  visitsByGroup: (
    group: string,
    filters: EventFilterModel
  ) => Promise<StatsModel[]>;
}
