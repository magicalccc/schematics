import { Test, TestingModule } from '@nestjs/testing';
import { CrudService } from '../../../../common/helpers';
import { <%= classify(name) %>Repository } from '../../../../entities';
import { <%= classify(name) %>Mapper } from '../../mappers/note-factory/note-factory.mapper';
import { <%= classify(name) %>PoliciesService } from '../../policies/note-factory/note-factory-policies.service';
import { <%= classify(name) %>PopulateService } from '../../populate/note-factory/note-factory-populate.service';
import { <%= classify(name) %>AggregateService } from './note-factory-aggregate.service';

describe('<%= classify(name) %>AggregateService', () => {
  let service: <%= classify(name) %>AggregateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        <%= classify(name) %>AggregateService,
        {
          provide: <%= classify(name) %>Repository,
          useValue: {},
        },
        {
          provide: <%= classify(name) %>PoliciesService,
          useValue: {},
        },
        {
          provide: CrudService,
          useValue: {},
        },
        {
          provide: <%= classify(name) %>PopulateService,
          useValue: {},
        },
        {
          provide: <%= classify(name) %>Mapper,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<<%= classify(name) %>AggregateService>(
      <%= classify(name) %>AggregateService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
