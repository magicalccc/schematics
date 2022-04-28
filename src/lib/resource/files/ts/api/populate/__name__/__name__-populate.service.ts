import { Injectable } from '@nestjs/common';
import { <%= classify(name) %>Entity } from '../../../../entities';
import { <%= classify(name) %>CreateRequest } from '../../../../note-factory/shared';
import * as uuidv4 from 'uuid/v4';

@Injectable()
export class <%= classify(name) %>PopulateService {
  async populate<%= classify(name) %>(
    entityBody: <%= classify(name) %>CreateRequest,
    target: <%= classify(name) %>Entity,
  ): Promise<void> {
    target.name = entityBody.name;
    target.title = entityBody.title || '';

    if (!target.uuid) {
      target.uuid = uuidv4();
    }
  }
}
