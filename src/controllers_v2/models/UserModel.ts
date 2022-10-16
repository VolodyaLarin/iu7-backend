import "reflect-metadata";

import { ApiModel, ApiModelProperty, SwaggerDefinitionConstant } from "swagger-express-ts";
import { StudentModel } from "../../services/StudentService";

@ApiModel({
  description: "Contingent",
  name: "C2ContingentModel",
})
export class C2ContingentModel {
  @ApiModelProperty({
    description: "Id of contingent",
    required: false,
    example: "123456789",
  })
  id?: string;

  @ApiModelProperty({
    description: "login of contingent",
    required: true,
    example: "19У232",
  })
  login: string;

  @ApiModelProperty({
    description: "Surname",
    required: true,
    example: "Ларин",
  })
  surname: string;

  @ApiModelProperty({
    description: "Name",
    required: true,
    example: "Владимир",
  })
  name: string;

  @ApiModelProperty({
    description: "Second name",
    required: true,
    example: "Николаевич",
  })
  secname: string;

  @ApiModelProperty({
    description: "Birthday",
    required: true,
    example: "2001-09-24",
  })
  birthday: Date;

  @ApiModelProperty({
    description: "Группа",
    required: true,
    example: "ИУ7-74Б",
  })
  group: string;
}

@ApiModel({
  description: "StatsScoreModel",
  name: "C2StatsScoreModel",
})
export class StatsScoreModel {
  @ApiModelProperty({
    description: "Total number of events",
    required: true,
  })
  total: number;

  @ApiModelProperty({
    description: "Visited number of events",
    required: true,
  })
  visited: number;
}

@ApiModel({
  description: "User",
  name: "C2UserModel",
})
export class C2UserModel {
  @ApiModelProperty({
    description: "Id of user",
    required: true,
    example: "123456789",
  })
  public id: string;

  @ApiModelProperty({
    description: "Unique login of user",
    required: true,
    example: "lvn19u232",
  })
  login: string;

  @ApiModelProperty({
    description: "Unique login in CAS service",
    required: true,
    example: "19У232",
  })
  contingentLogin: string;

  @ApiModelProperty({
    description: "Url to avatar",
    required: false,
    example: "https://google.com/image.png",
  })
  photo?: string;

  @ApiModelProperty({
    description: "Role Id",
    required: false,
    example: "0",
  })
  role?: number;

  @ApiModelProperty({
    description: "Contingent data",
    required: false,
    model: "C2ContingentModel"
  })
  contingent?: C2ContingentModel;

  @ApiModelProperty({
    description: "Student card data",
    required: false,
    type: SwaggerDefinitionConstant.OBJECT,
  })
  student?: StudentModel;

  @ApiModelProperty({
    description: "Stats",
    required: false,
    model: 'C2StatsScoreModel'
  })
  stats?: StatsScoreModel 
}
