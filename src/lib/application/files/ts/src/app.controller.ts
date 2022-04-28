import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { RootApiResponse } from './common/dtos/root-api.response';
import { ServerSettings } from './system-settings/entities/server-settings/server-settings.entity';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: RootApiResponse })
  getRoot() {
    return this.appService.getRoot();
  }

  @Get('info')
  @ApiResponse({ status: HttpStatus.OK, type: ServerSettings })
  info() {
    return this.appService.info();
  }
}
