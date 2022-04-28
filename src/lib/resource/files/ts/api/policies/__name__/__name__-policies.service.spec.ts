import { Test, TestingModule } from '@nestjs/testing';
import { <%= classify(name) %>PoliciesService } from './note-factory-policies.service';

describe('<%= classify(name) %>PoliciesService', () => {
  let service: <%= classify(name) %>PoliciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [<%= classify(name) %>PoliciesService],
    }).compile();

    service = module.get<<%= classify(name) %>PoliciesService>(
      <%= classify(name) %>PoliciesService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
