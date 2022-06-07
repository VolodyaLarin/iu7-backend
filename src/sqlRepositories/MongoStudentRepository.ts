import { inject, injectable } from "inversify";
import { Db, ObjectId } from "mongodb";
import StudentRepository from "../repositories/student";
import { StudentModel, FieldModel } from "../services/StudentService";

@injectable()
export class MongoStudentRepository implements StudentRepository {
  db: Db;
  constructor(@inject("mongoDb") db: Db) {
    this.db = db;
  }

  _mapStudent(row): StudentModel {
    if (!row) return null;
    return Object.assign({}, row, {
      userId: row.userId,
      id: String(row._id),
    });
  }

  _mapFields(row): FieldModel[] {
    if (!row) return [];
    return row.fields;
  }
  async create(e: Omit<StudentModel, "id">): Promise<StudentModel> {
    const res = await this.db.collection("students").insertOne(e);

    return await this.getById(String(res.insertedId));
  }

  async getByUserId(id: string): Promise<StudentModel> {
    const row = await this.db.collection("students").findOne({
      userId: String(id),
    });

    return this._mapStudent(row);
  }
  async getById(userId: string): Promise<StudentModel> {
    return this.getByUserId(userId);
  }
  async updateById(
    userId: string,
    e: Omit<StudentModel, "id">
  ): Promise<StudentModel> {
    // const _id = new ObjectId(id);
    await this.db.collection("students").updateOne(
      {
        // _id,
        userId,
      },
      {
        $set: Object.assign({}, e, {
          // _id,,
          userId,
        }),
      },
      {
        upsert: true,
      }
    );

    return await this.getById(userId);
  }
  async deleteById(id: string): Promise<boolean> {
    const res = await this.db.collection("students").deleteOne({
      _id: new ObjectId(id),
    });
    return res.deletedCount >= 1;
  }

  async getFieldsByGroup(group: string): Promise<FieldModel[]> {
    const row = await this.db.collection("student_fields").findOne({
      group,
    });
    return this._mapFields(row);
  }
  async updateFieldsByGroup(
    group: string,
    fields: FieldModel[]
  ): Promise<void> {
    await this.db.collection("student_fields").updateOne(
      {
        group,
      },
      {
        $set: {
          group,
          fields,
        },
      },
      {
        upsert: true,
      }
    );
  }
}
