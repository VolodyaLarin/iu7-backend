import { ApiModel, ApiModelProperty, SwaggerDefinitionConstant } from "swagger-express-ts";


@ApiModel({
    description: "Meta",
    name: "С2GroupMeta",
})
export class С2GroupMeta {
    @ApiModelProperty({
        description: "Предметы",
        required: true,
        type: SwaggerDefinitionConstant.ARRAY,
        itemType: SwaggerDefinitionConstant.STRING
    })
    subjects: string[];

    @ApiModelProperty({
        description: "Типы занятий",
        required: true,
        type: SwaggerDefinitionConstant.ARRAY,
        itemType: SwaggerDefinitionConstant.STRING
    })
    types: string[];

    @ApiModelProperty({
        description: "Спикеры",
        required: true,
        type: SwaggerDefinitionConstant.ARRAY,
        itemType: SwaggerDefinitionConstant.STRING
    })
    speakers: string[];
}