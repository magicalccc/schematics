import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import {
  IsArray,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CrudListSortDto } from './crud-list-sort.dto';

export class CrudListRequestDto<T = any> {
  @ApiModelProperty({
    description: 'Page (from 1 to ...)',
    required: false,
  })
  @IsPositive()
  @IsInt()
  @IsOptional()
  index?: number;

  @ApiModelProperty({
    description:
      'Items per page. Provide 0 or negative value to get all entities',
    required: false,
  })
  @IsInt()
  @IsOptional()
  size?: number;

  @ApiModelProperty({
    description: 'Sort order',
    required: false,
  })
  @ValidateNested()
  @IsOptional()
  sort?: CrudListSortDto<T>;

  @ApiModelProperty({
    description: 'Search by query string',
    required: false,
  })
  @IsString()
  @IsOptional()
  queryString?: string;

  @ApiModelProperty({
    description: 'Include only set of fields',
    required: false,
    type: 'string',
    isArray: true,
  })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  includeFields?: Array<keyof T>;

  @ApiModelProperty({
    description: 'Exclude set of fields',
    required: false,
    type: 'string',
    isArray: true,
  })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  excludeFields?: Array<keyof T>;
}
