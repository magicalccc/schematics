import {
  Controller,
  Get,
  UsePipes,
  ValidationPipe,
  Body,
  Post,
  UseGuards,
  Req,
  HttpStatus,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ServerSettingsDto } from '../../../system-settings/entities/server-settings/server-setting.dto';
import { ADMINISTRATOR } from '../../../common/constants/app-strings';
import { TokenGuard } from '../../../auth/guards/token.guard';
import { RoleGuard } from '../../../auth/guards/role.guard';
import { Roles } from '../../../auth/decorators/roles.decorator';
import { SettingsService } from '../../aggregates/settings/settings.service';
import { RegisterServiceCommand } from '../../commands/register-service/register-service.command';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ServerSettings } from '../../entities/server-settings/server-settings.entity';
import { CommonOpenApi } from '../../../common/constants/api-tags';

@Controller('settings')
@ApiTags(CommonOpenApi.ServerSettings)
export class SettingsController {
  constructor(
    private readonly settingsService: SettingsService,
    private readonly commandBus: CommandBus,
  ) {}

  @Get('v1/get')
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: ServerSettings })
  @Roles(ADMINISTRATOR)
  @UseGuards(TokenGuard, RoleGuard)
  async getSettings() {
    return await this.settingsService.find();
  }

  @Post('v1/update')
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.CREATED, type: ServerSettings })
  @Roles(ADMINISTRATOR)
  @UseGuards(TokenGuard, RoleGuard)
  @UsePipes(new ValidationPipe({ forbidNonWhitelisted: true }))
  async updateSettings(@Body() payload: ServerSettingsDto) {
    return from(this.settingsService.find()).pipe(
      switchMap((settings) => {
        return this.settingsService.update({ uuid: settings.uuid }, payload);
      }),
    );
  }

  @Post('v1/register_service')
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.CREATED })
  @Roles(ADMINISTRATOR)
  @UseGuards(TokenGuard, RoleGuard)
  async registerService(@Req() req) {
    const { token } = req;
    return await this.commandBus.execute(new RegisterServiceCommand(token));
  }
}
