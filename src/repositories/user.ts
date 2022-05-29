import { UserModel } from "../services/AuthService";
import Repository from "./repository";

export default interface UserRepository extends Repository<UserModel, number> {
    getByGroup(group:string): Promise<UserModel[]>;
    getByLogin(login:string): Promise<UserModel | null>;
    getByToken(token:string): Promise<UserModel | null>;
}