import { Module, Global } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

const <%= classify(name) %>CmsServices = [];

const <%= classify(name) %>CmsControllers = [];

@Module({
  imports: [HttpModule],
  providers: [...<%= classify(name) %>CmsServices],
  controllers: [...<%= classify(name) %>CmsControllers],
  exports: [],
})
export class <%= classify(name) %>CmsModule {}
