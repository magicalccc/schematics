import { HttpStatus } from '@nestjs/common';
import { CoreAppException } from '../../../common/exceptions/core-app.exception';

export class <%= classify(name) %>NotFoundException extends CoreAppException {
  constructor(message) {
    super('<%= classify(name) %>NotFoundException', message, HttpStatus.NOT_FOUND);
  }
}
