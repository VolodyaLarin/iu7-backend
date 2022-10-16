import "reflect-metadata";

import {
  ApiModel,
  ApiModelProperty,
  SwaggerDefinitionConstant,
} from "swagger-express-ts";

@ApiModel({
  description: "Error",
  name: "C2Error",
})
export class C2Error {
  @ApiModelProperty({
    required: true,
    type: SwaggerDefinitionConstant.ARRAY,
    itemType: SwaggerDefinitionConstant.STRING
  })
  errors: string[];
 
}


@ApiModel({
  description: "Status OK",
  name: "C2StatusOk",
})
export class C2StatusOk {
  @ApiModelProperty({
    required: true,
    example: 'OK'
  })
  status: string;
}