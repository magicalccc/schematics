import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';

export enum CrudListSortOrder {
  Asc = 'ASC',
  Desc = 'DESC',
}

export class CrudListSort<T> {
  @ApiModelProperty({
    type: 'string',
    description: 'Field to sort',
  })
  field: keyof T;

  @ApiModelProperty({
    type: 'string',
    enum: Object.values(CrudListSortOrder),
    description: 'Sort order',
  })
  order: CrudListSortOrder;
}

export class CrudListSortDto<T> {
  @ApiModelProperty({
    type: () => CrudListSort,
    isArray: true,
    description: 'Sort order commands',
  })
  @ValidateNested({ each: true })
  @IsArray()
  @IsNotEmpty()
  commands: Array<CrudListSort<T>>;
}
