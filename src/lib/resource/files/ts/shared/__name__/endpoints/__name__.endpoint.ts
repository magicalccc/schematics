import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Observable } from 'rxjs';
import {
  CrudListRequestDto,
  CrudListResponseDto,
} from '../../../../common/helpers';
import { <%= classify(name) %>Dto } from '../dto/note-factory.dto';

export enum <%= classify(name) %>EndpointPaths {
  create = '/note-factory/api/create',
  update = '/note-factory/api/update',
  delete = '/note-factory/api/delete',
  get = '/note-factory/api/get',
  list = '/note-factory/api/list',
}

export interface <%= classify(name) %>Endpoint {
  create(
    request: <%= classify(name) %>CreateRequest,
  ): Promise<<%= classify(name) %>Dto> | Observable<<%= classify(name) %>Dto>;
  update(
    request: <%= classify(name) %>UpdateRequest,
  ): Promise<<%= classify(name) %>Dto> | Observable<<%= classify(name) %>Dto>;
  delete(request: <%= classify(name) %>DeleteRequest): Promise<void> | Observable<void>;
  getById(
    request: <%= classify(name) %>GetByIdRequest,
  ): Promise<<%= classify(name) %>Dto> | Observable<<%= classify(name) %>Dto>;
  list(
    request: <%= classify(name) %>ListRequest,
  ): Promise<<%= classify(name) %>ListResponse> | Observable<<%= classify(name) %>ListResponse>;
}

export class <%= classify(name) %>EntityBody {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  title: string;
}

export class <%= classify(name) %>CreateRequest extends <%= classify(name) %>EntityBody {}

export class <%= classify(name) %>UpdateRequest extends <%= classify(name) %>EntityBody {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  uuid: string;
}

export class <%= classify(name) %>DeleteRequest {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  uuid: string;
}

export class <%= classify(name) %>GetByIdRequest {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  uuid: string;
}

export class <%= classify(name) %>ListRequest extends CrudListRequestDto<<%= classify(name) %>Dto> {}

export class <%= classify(name) %>ListResponse extends CrudListResponseDto<<%= classify(name) %>Dto> {}
