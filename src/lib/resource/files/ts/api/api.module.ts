import { Module, Global } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { <%= classify(name) %>ApiPolicies } from './policies';
import { <%= classify(name) %>ApiControllers } from './controllers';
import { <%= classify(name) %>ApiMappers } from './mappers';
import { <%= classify(name) %>ApiAggregates } from './aggregates';
import { <%= classify(name) %>Populate } from './populate';

const <%= classify(name) %>ApiServices = [
  ...<%= classify(name) %>ApiAggregates,
  ...<%= classify(name) %>ApiPolicies,
  ...<%= classify(name) %>ApiMappers,
  ...<%= classify(name) %>Populate,
];

const <%= classify(name) %>Controllers = [...<%= classify(name) %>ApiControllers];

@Module({
  imports: [HttpModule],
  providers: [...<%= classify(name) %>ApiServices],
  controllers: [...<%= classify(name) %>Controllers],
  exports: [],
})
export class <%= classify(name) %>ApiModule {}
