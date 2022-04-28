import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { CrudListRequestDto } from './crud-list-request.dto';
import { CrudListResponseDto } from './crud-list-response.dto';

export const CORE_CRUD_DEFAULT_INDEX = 1;
export const CORE_CRUD_DEFAULT_SIZE = 10;

export class CrudListServiceRequest<T, DTO = T> {
  entity: any;
  request: any;
  mapper?: (items: Array<T>) => Promise<Array<DTO>>;
  findOptions?: FindManyOptions<T> = {};
  postprocess?: (items: Array<T>) => Promise<void>;
}

@Injectable()
export class CrudService {
  async find<T = any, DTO = T>(
    options: CrudListServiceRequest<T, DTO>,
    repository: Repository<unknown>,
  ): Promise<CrudListResponseDto<DTO>> {
    const request: any = {
      ...options.request,
      index: Number(options.request?.index) || CORE_CRUD_DEFAULT_INDEX,
      size: Number(options.request?.size) || CORE_CRUD_DEFAULT_SIZE,
    };

    const processed = await this.findOptions(
      options.findOptions || {},
      request,
    );

    const items = (await repository.find(processed)) as Array<T>;
    const total = await repository.count(processed);

    if (options.postprocess) {
      await options.postprocess(items);
    }

    const result: any = {
      items: options.mapper
        ? await options.mapper(items)
        : (items as any as Array<DTO>),
      pager: {
        index: request.index,
        size: request.size,
        total,
      },
    };

    return result;
  }

  async findOptions<T = any, R = any>(
    findOptions: FindManyOptions<T>,
    request: CrudListRequestDto<R>,
  ): Promise<FindManyOptions> {
    await this.applyFindPaginator(findOptions, request);
    await this.applySort(findOptions, request);

    return findOptions;
  }

  private async applyFindPaginator<T = any, R = any>(
    findOptions: FindManyOptions<T>,
    request: CrudListRequestDto<R>,
  ): Promise<void> {
    if (request.size && request.size > 0) {
      findOptions.take = request.size;
    }

    if (request.index && request.size > 0) {
      findOptions.skip = Math.max(0, request.index - 1) * request.size;
    }
  }

  private async applySort<T = any, R = any>(
    findOptions: FindManyOptions<T>,
    request: CrudListRequestDto<R>,
  ): Promise<void> {
    if (
      request.sort &&
      Array.isArray(request.sort.commands) &&
      request.sort.commands.length > 0
    ) {
      const sort: { [key: string]: 'ASC' | 'DESC' | 1 | -1 } = {};

      for (const command of request.sort.commands) {
        sort[command.field as string] = command.order;
      }

      // TODO: Investigate & Fix type issues (it works, but should be updated)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      findOptions.order = sort;
    }
  }
}
