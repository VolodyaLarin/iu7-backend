import { inject, injectable } from "inversify";
import StudentRepository from "../repositories/student";
import StudentService, {
  FieldModel,
  StudentModel,
} from "../services/StudentService";

@injectable()
export class Iu7StudentService implements StudentService {
  repo: StudentRepository;

  constructor(@inject("StudentRepository") repo: StudentRepository) {
    this.repo = repo;
  }
  updateStudent(id: string, student: StudentModel): Promise<StudentModel> {
    return this.repo.updateById(id, student);
  }
  updateFields(group: string, fields: FieldModel[]): Promise<void> {
    return this.repo.updateFieldsByGroup(group, fields);
  }
}
