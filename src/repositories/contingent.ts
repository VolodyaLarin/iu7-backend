import Repository from "./repository";

export interface ContingentModel {
  login: string;
  surname: string;
  name: string;
  secname: string;
  birthday: Date;
  group: string;
}


export default interface ContingentRepository
  extends Repository<ContingentModel> {
      getByLogin: (login:string) => Promise<ContingentModel>;
      getByGroup: (group:string) => Promise<ContingentModel[]>;
  }
