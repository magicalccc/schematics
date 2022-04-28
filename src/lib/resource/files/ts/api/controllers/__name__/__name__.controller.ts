import {
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { <%= classify(name) %>AggregateService } from '../../aggregates/note-factory-aggregate/note-factory-aggregate.service';
import { TokenGuard } from '../../../../auth/guards/token.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  <%= classify(name) %>CreateRequest,
  <%= classify(name) %>DeleteRequest,
  <%= classify(name) %>Dto,
  <%= classify(name) %>Endpoint,
  <%= classify(name) %>EndpointPaths,
  <%= classify(name) %>GetByIdRequest,
  <%= classify(name) %>ListRequest,
  <%= classify(name) %>ListResponse,
  <%= classify(name) %>UpdateRequest,
} from '../../../shared';
import { <%= classify(name) %>OpenApi } from '../../../../common/constants/api-tags';

@Controller()
@UseGuards(TokenGuard)
@ApiTags(<%= classify(name) %>OpenApi.<%= classify(name) %>)
export class <%= classify(name) %>Controller implements <%= classify(name) %>Endpoint {
  constructor(private readonly aggregate: <%= classify(name) %>AggregateService) {}

  @Post(<%= classify(name) %>EndpointPaths.create)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'create',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: <%= classify(name) %>Dto,
  })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(
    @Body() request: <%= classify(name) %>CreateRequest,
  ): Promise<<%= classify(name) %>Dto> {
    return await this.aggregate.create(request);
  }

  @Post(<%= classify(name) %>EndpointPaths.update)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'update',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: <%= classify(name) %>Dto,
  })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(
    @Body() request: <%= classify(name) %>UpdateRequest,
  ): Promise<<%= classify(name) %>Dto> {
    return await this.aggregate.update(request);
  }

  @Post(<%= classify(name) %>EndpointPaths.delete)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Delete Note',
  })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async delete(@Body() request: <%= classify(name) %>DeleteRequest): Promise<void> {
    return await this.aggregate.delete(request);
  }

  @Post(<%= classify(name) %>EndpointPaths.get)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'get by UUID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: <%= classify(name) %>ListResponse,
  })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async getById(
    @Body() request: <%= classify(name) %>GetByIdRequest,
  ): Promise<<%= classify(name) %>Dto> {
    return await this.aggregate.getById(request);
  }

  @Post(<%= classify(name) %>EndpointPaths.list)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'list',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: <%= classify(name) %>ListResponse,
  })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async list(
    @Body() request: <%= classify(name) %>ListRequest,
  ): Promise<<%= classify(name) %>ListResponse> {
    return await this.aggregate.list(request);
  }
}
