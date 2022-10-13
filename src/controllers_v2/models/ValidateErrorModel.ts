import "reflect-metadata";

import {
  ApiModel,
  ApiModelProperty,
  SwaggerDefinitionConstant,
} from "swagger-express-ts";

@ApiModel({
  description: "Validate Error",
  name: "C2ValidateError",
})
class C2ValidateError {
  @ApiModelProperty({
    required: true,
  })
  keyword: string;
  @ApiModelProperty({
    required: true,
  })
  dataPath: string;
  @ApiModelProperty({
    required: true,
  })
  schemaPath: string;
}

@ApiModel({
  description: "Validate errors",
  name: "C2ValidateErrors",
})
export class C2ValidateErrors {
  @ApiModelProperty({
    required: true,
    type: SwaggerDefinitionConstant.ARRAY,
    model: "C2ValidateError",
  })
  errors: C2ValidateError;
}
