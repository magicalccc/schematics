import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class <%= classify(name) %>Dto {
  @ApiModelProperty()
  _id?: number | string;

  @ApiModelProperty()
  uuid: string;

  @ApiModelProperty()
  name: string;

  @ApiModelProperty()
  title: string;
}
