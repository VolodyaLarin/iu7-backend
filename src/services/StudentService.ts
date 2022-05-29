export type StudentModel = Record<string, unknown>;

export type FieldModel = {
  fieldType: "string" | "boolean";
  fieldName: string;
  fieldLabel: string;
};
export default interface StudentService {
  updateStudent: (id: string, student: StudentModel) => Promise<void>;
  updateFields: (group: string, fields: FieldModel[]) => Promise<void>;
}
