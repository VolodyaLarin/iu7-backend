import { FieldModel, StudentModel } from "../services/StudentService";
import Repository from "./repository";


export default interface StudentRepository extends Repository<StudentModel, string> {
    getByUserId: (id:number) => Promise<StudentModel>;
    getFieldsByGroup: (group:string) => Promise<FieldModel[]>;
    updateFieldsByGroup: (group:string,  fields: FieldModel[]) => Promise<void>;
}