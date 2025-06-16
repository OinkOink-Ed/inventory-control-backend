import { HttpException, HttpStatus } from '@nestjs/common';

export class InsufficientCartridgesException extends HttpException {
  constructor() {
    super(
      { message: 'Нет такого количества картриджей для выдачи' },
      HttpStatus.BAD_REQUEST,
    );
  }
}
