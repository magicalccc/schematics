import { SettingsService } from './settings/settings.service';
import { TerminusOptionsService } from './terminus-options/terminus-options.service';

export const SystemSettingsAggregates = [
  SettingsService,
  TerminusOptionsService,
];
