import { HttpException, HttpStatus } from '@nestjs/common';

export class NoCartridgesException extends HttpException {
  constructor() {
    super({ message: 'Нет картриджей для выдачи' }, HttpStatus.BAD_REQUEST);
  }
}
