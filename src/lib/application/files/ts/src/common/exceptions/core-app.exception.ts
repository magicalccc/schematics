import { HttpException, HttpStatus } from '@nestjs/common';
import { replaceTags } from './replace-tags.utils';

const OVERRIDE_ERROR: Array<{
  errorCode: any;
  message: string;
  statusCode?: HttpStatus;
}> = [];

export function coreAppExceptionOverrideMessage<T = any>(
  errorCode: T,
  message: string,
  statusCode?: HttpStatus,
) {
  OVERRIDE_ERROR.push({
    errorCode,
    message,
    statusCode,
  });
}

function Message<T = any>(errorCode: T, message: string) {
  const override = OVERRIDE_ERROR.find((def) => def.errorCode === errorCode);

  return override ? override.message : message;
}

function StatusCode<T = any>(errorCode: T, statusCode: HttpStatus) {
  const override = OVERRIDE_ERROR.find((def) => def.errorCode === errorCode);

  return override && override.statusCode ? override.statusCode : statusCode;
}

export class CoreAppException<T = any> extends HttpException {
  constructor(
    public readonly errorCode: T,
    public readonly message: string,
    public readonly statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
    public readonly args?: any,
    public readonly details?: any,
  ) {
    super(
      replaceTags(Message(errorCode, message), args),
      StatusCode(errorCode, statusCode),
    );

    this.message = replaceTags(Message(errorCode, message), args);
  }
}
