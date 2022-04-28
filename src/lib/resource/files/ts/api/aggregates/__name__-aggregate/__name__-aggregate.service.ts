import { Injectable } from '@nestjs/common';
import { <%= classify(name) %>PoliciesService } from '../../policies/note-factory/note-factory-policies.service';
import { <%= classify(name) %>Entity, <%= classify(name) %>Repository } from '../../../../entities';
import { CrudService } from '../../../../common/helpers';
import {
  <%= classify(name) %>CreateRequest,
  <%= classify(name) %>DeleteRequest,
  <%= classify(name) %>Dto,
  <%= classify(name) %>ListRequest,
  <%= classify(name) %>ListResponse,
  <%= classify(name) %>UpdateRequest,
} from '../../../../note-factory/shared';
import { <%= classify(name) %>Mapper } from '../../mappers/note-factory/note-factory.mapper';
import { <%= classify(name) %>PopulateService } from '../../populate/note-factory/note-factory-populate.service';
import { <%= classify(name) %>NotFoundException } from '../../exceptions/note-factory-not-found.exception';

@Injectable()
export class <%= classify(name) %>AggregateService {
  constructor(
    private readonly <%= classify(name) %>Repo: <%= classify(name) %>Repository,
    private readonly <%= classify(name) %>Policies: <%= classify(name) %>PoliciesService,
    private readonly crud: CrudService,
    private readonly populate: <%= classify(name) %>PopulateService,
    private readonly mapper: <%= classify(name) %>Mapper,
  ) {}

  async create(request: <%= classify(name) %>CreateRequest): Promise<<%= classify(name) %>Dto> {
    const entity = new <%= classify(name) %>Entity();

    await this.<%= classify(name) %>Policies.validateNoteCreate(request);
    await this.populate.populate<%= classify(name) %>(request, entity);
    await this.<%= classify(name) %>Repo.create(entity);

    return await this.mapper.entityToDTO(entity);
  }

  async update(request: <%= classify(name) %>UpdateRequest): Promise<<%= classify(name) %>Dto> {
    const entity = await this.<%= classify(name) %>Repo.findOne({
      where: {
        uuid: request.uuid,
      },
    });

    await this.populate.populate<%= classify(name) %>(request, entity);
    await this.<%= classify(name) %>Repo.save(entity);

    return await this.mapper.entityToDTO(entity);
  }

  async delete(request: <%= classify(name) %>DeleteRequest): Promise<void> {
    await this.<%= classify(name) %>Repo.deleteOne({
      uuid: request.uuid,
    });
  }

  async getById(request: <%= classify(name) %>DeleteRequest): Promise<<%= classify(name) %>Dto> {
    const entity = await this.<%= classify(name) %>Repo.findOne({
      where: {
        uuid: request.uuid,
      },
    });

    if (!entity) {
      throw new <%= classify(name) %>NotFoundException(
        `No note found for UUID: ${request.uuid}`,
      );
    }

    return await this.mapper.entityToDTO(entity);
  }

  async list(
    request: <%= classify(name) %>ListRequest,
  ): Promise<<%= classify(name) %>ListResponse> {
    return this.crud.find<<%= classify(name) %>Entity, <%= classify(name) %>Dto>(
      {
        entity: <%= classify(name) %>Entity,
        request,
        mapper: async (items) => this.mapper.entitiesToDTOs(items),
        findOptions: {
          order: {
            _id: 'DESC',
          },
        },
      },
      this.<%= classify(name) %>Repo.repository,
    );
  }
}
