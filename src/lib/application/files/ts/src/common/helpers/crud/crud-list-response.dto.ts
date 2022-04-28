import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { CrudListPaginatorDto } from './crud-list-paginator.dto';

export class CrudListResponseDto<T> {
  @ApiModelProperty({
    isArray: true,
  })
  items: Array<T>;

  @ApiModelProperty()
  pager: CrudListPaginatorDto;

  @ApiModelProperty()
  maxSortOrder?: number;
}
