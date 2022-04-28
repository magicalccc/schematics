import { Injectable } from '@nestjs/common';
import { <%= classify(name) %>CreateRequest } from '../../../../note-factory/shared';

@Injectable()
export class <%= classify(name) %>PoliciesService {
  async validateNoteCreate(
    payload: <%= classify(name) %>CreateRequest,
  ): Promise<boolean> {
    return true;
  }
}
