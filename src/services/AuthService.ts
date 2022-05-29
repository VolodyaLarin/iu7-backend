import { StudentModel } from "./StudentService";

export interface UserModel {
    id: string;
    token: string;
    login: string;
    contingentLogin: string;
    photo?: string;
    contingent?: null;
    student?: StudentModel;
}

export default interface AuthService {
    auth: (bearer:string)=> Promise<UserModel>
    checkTicket: (ticket:string)=> Promise<string>
}