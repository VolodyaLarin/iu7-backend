import "reflect-metadata";

import {
  ApiModel,
  ApiModelProperty,
} from "swagger-express-ts";

@ApiModel({
  description: "Field",
  name: "C2Field",
})
export class C2Field {
  @ApiModelProperty({
    required: true,
    description: 'Тип поля'
  })
  fieldType: string;

  @ApiModelProperty({
    required: true,
    description: 'Служебное имя'
  })
  fieldName: string;

  @ApiModelProperty({
    required: true,
    description: 'Название'
  })
  fieldLabel: string;
 
}
