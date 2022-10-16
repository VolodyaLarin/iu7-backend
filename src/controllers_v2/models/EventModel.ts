import "reflect-metadata";

import { ApiModel, ApiModelProperty, SwaggerDefinitionConstant } from "swagger-express-ts";

@ApiModel({
  description: "Visit",
  name: "C2VisitModel",
})
export class C2VisitModel {
  @ApiModelProperty({
    description: "Id of visit",
    required: true,
    example: "123456789",
  })
  id?: string;
  @ApiModelProperty({
    description: "Id of user",
    required: true,
    example: "123456789",
  })
  userId: string;

  @ApiModelProperty({
    description: "Id of event",
    required: true,
    example: "123456789",
  })
  eventId: string;
}

@ApiModel({
  description: "Event",
  name: "C2EventModel",
})
export class C2EventModel {
  @ApiModelProperty({
    description: "Id of event",
    required: true,
    example: "123456789",
  })
  id: string;

  @ApiModelProperty({
    description: "Дата события",
    required: true,
    example: "2022-09-12 15:00:00",
  })
  date:Date;

  @ApiModelProperty({
    description: "Группа",
    required: true,
    example: "ИУ7-74Б",
  })
  group: string;

  @ApiModelProperty({
    description: "Спикер",
    required: false,
    example: "Иванов В.В.",
  })
  speaker?: string;

  @ApiModelProperty({
    description: "Тип мероприятия",
    required: false,
    example: "Лекция",
  })
  type?: string;

  @ApiModelProperty({
    description: "Предмет / Название",
    required: false,
    example: "Веб",
  })
  subject: string;

  @ApiModelProperty({
    description: "Место встречи",
    required: false,
    example: "228л",
  })
  place?: string;

  @ApiModelProperty({
    description: "Тема мероприятия",
    required: false,
    example: "Вступительная лекция",
  })
  theme?: string;

  @ApiModelProperty({
    description: "Описание мероприятия",
    required: false,
    example: "Будет проходить по ссылке https://zoom.com/ad",
  })
  description?: string;

  @ApiModelProperty({
    description: "Посещения",
    required: false,
    type: SwaggerDefinitionConstant.ARRAY,
    model: "C2VisitModel"
  })
  visits?: C2VisitModel[];
}

@ApiModel({
  description: "Event",
  name: "C2PostEventModel",
})
export class C2PostEventModel {
  @ApiModelProperty({
    description: "Дата события",
    required: true,
    example: "2022-09-12 15:00:00",
  })
  date:Date;

  @ApiModelProperty({
    description: "Группа",
    required: true,
    example: "ИУ7-74Б",
  })
  group: string;

  @ApiModelProperty({
    description: "Спикер",
    required: false,
    example: "Иванов В.В.",
  })
  speaker?: string;

  @ApiModelProperty({
    description: "Тип мероприятия",
    required: false,
    example: "Лекция",
  })
  type?: string;

  @ApiModelProperty({
    description: "Предмет / Название",
    required: false,
    example: "Веб",
  })
  subject: string;

  @ApiModelProperty({
    description: "Место встречи",
    required: false,
    example: "228л",
  })
  place?: string;

  @ApiModelProperty({
    description: "Тема мероприятия",
    required: false,
    example: "Вступительная лекция",
  })
  theme?: string;

  @ApiModelProperty({
    description: "Описание мероприятия",
    required: false,
    example: "Будет проходить по ссылке https://zoom.com/ad",
  })
  description?: string;
}

@ApiModel({
  description: "Event",
  name: "C2PatchVisitModel",
})
export class C2PatchVisitModel {
  @ApiModelProperty({
    description: "Id пользователя",
    required: true,
  })
  id: string
}