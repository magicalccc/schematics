import { Module, Global } from '@nestjs/common';
import { ConfigService } from './config/config.service';
import { HttpModule } from '@nestjs/axios';
import { CrudService } from './helpers/';

const SERVICES = [ConfigService, CrudService];

@Global()
@Module({
  imports: [HttpModule],
  providers: [...SERVICES],
  exports: [...SERVICES],
})
export class CommonModule {}
