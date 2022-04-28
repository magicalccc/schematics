import { Injectable } from '@nestjs/common';
import { settingsAlreadyExists } from '../../../common/constants/exceptions';
import { ServerSettings } from '../../../system-settings/entities/server-settings/server-settings.entity';
import { ServerSettingsService } from '../../../system-settings/entities/server-settings/server-settings.service';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class SetupService {
  constructor(
    protected readonly serverSettingsService: ServerSettingsService,
    protected readonly http: HttpService,
  ) {}

  async setup(params) {
    if (await this.serverSettingsService.count()) {
      throw settingsAlreadyExists;
    }

    const settings = new ServerSettings();
    Object.assign(settings, params);
    await settings.save();

    this.http
      .get(params.authServerURL + '/.well-known/openid-configuration')
      .subscribe({
        next: async (response) => {
          params.authorizationURL = response.data.authorization_endpoint;
          params.tokenURL = response.data.token_endpoint;
          params.profileURL = response.data.userinfo_endpoint;
          params.revocationURL = response.data.revocation_endpoint;
          params.introspectionURL = response.data.introspection_endpoint;
          params.callbackURLs = [
            params.appURL + '/api/connected_device/callback',
            params.appURL + '/callback',
          ];
          Object.assign(settings, params);
          await settings.save();
        },
        error: async (error) => await settings.remove(),
      });
  }

  async getInfo() {
    const info = await this.serverSettingsService.find();
    if (info) {
      info.clientSecret = undefined;
      info._id = undefined;
    }
    return info as Omit<ServerSettings, 'clientSecret'>;
  }
}
