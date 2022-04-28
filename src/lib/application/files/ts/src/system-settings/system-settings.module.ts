import { Module, Global } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TerminusModule } from '@nestjs/terminus';
import { SystemSettingsEntitiesModule } from './entities/system-entities.module';
import { SettingsController } from './controllers/settings/settings.controller';
import { SetupController } from './controllers/setup/setup.controller';
import { ConnectController } from './controllers/connect/connect.controller';
import { SetupService } from './controllers/setup/setup.service';
import { SystemSettingsCommandHandlers } from './commands';
import { SystemSettingsAggregates } from './aggregates';
import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
  imports: [
    SystemSettingsEntitiesModule,
    HttpModule,
    CqrsModule,
    TerminusModule,
  ],
  providers: [
    SetupService,
    ...SystemSettingsAggregates,
    ...SystemSettingsCommandHandlers,
  ],
  controllers: [SettingsController, SetupController, ConnectController],
  exports: [SystemSettingsEntitiesModule, SetupService],
})
export class SystemSettingsModule {}
