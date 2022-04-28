import {
  Post,
  Controller,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SetupService } from './setup.service';
import { ServerSettingsDto } from '../../../system-settings/entities/server-settings/server-setting.dto';
import { CommonOpenApi } from '../../../common/constants/api-tags';
import { ApiTags } from '@nestjs/swagger';

@Controller('setup')
@ApiTags(CommonOpenApi.Setup)
export class SetupController {
  constructor(private readonly settingsService: SetupService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async setup(@Body() payload: ServerSettingsDto) {
    return await this.settingsService.setup(payload);
  }
}
