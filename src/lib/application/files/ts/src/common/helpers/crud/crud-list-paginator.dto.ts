import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class CrudListPaginatorDto {
  @ApiModelProperty({
    description: 'Page (from 1 to ...)',
  })
  @IsPositive()
  @IsInt()
  @IsNotEmpty()
  index: number;

  @ApiModelProperty({
    description: 'Total amount of items',
  })
  @IsInt()
  @IsNotEmpty()
  total: number;

  @ApiModelProperty({
    description: 'Items per page',
  })
  @IsPositive()
  @IsInt()
  @IsNotEmpty()
  size: number;
}
