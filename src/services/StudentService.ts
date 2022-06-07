export type StudentModel = {
  id: string;
  userID: string;
  [key: string]: unknown;
};

export type FieldModel = {
  fieldType: "string" | "boolean";
  fieldName: string;
  fieldLabel: string;
};
export default interface StudentService {
  updateStudent: (id: string, student: StudentModel) => Promise<StudentModel>;
  updateFields: (group: string, fields: FieldModel[]) => Promise<void>;
}
