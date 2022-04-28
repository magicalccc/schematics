import { Test, TestingModule } from '@nestjs/testing';
import { <%= classify(name) %>AggregateService } from '../../aggregates/note-factory-aggregate/note-factory-aggregate.service';
import { <%= classify(name) %>Controller } from './__name__.controller';
import { TokenGuard } from '../../../../auth/guards/token.guard';

describe('<%= classify(name) %>Controller', () => {
  let controller: <%= classify(name) %>Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [<%= classify(name) %>Controller],
      providers: [
        {
          provide: <%= classify(name) %>AggregateService,
          useValue: {},
        },
      ],
    })
      .overrideGuard(TokenGuard)
      .useValue({})
      .compile();

    controller = module.get<<%= classify(name) %>Controller>(<%= classify(name) %>Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
