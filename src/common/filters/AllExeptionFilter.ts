import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      response.status(status).json(exception.getResponse());
    } else if (exception instanceof QueryFailedError) {
      this.handleQueryFailedError(exception, response);
    } else if (exception instanceof UnauthorizedException) {
      response.status(401).json({
        message: 'Не авторизован',
        error: 'AuthNotFound',
      });
    } else if (exception instanceof EntityNotFoundError) {
      response.status(404).json({
        message: 'Ресурс не найден',
        error: 'NotFound',
      });
    } else if (exception.message?.includes('timeout')) {
      response.status(408).json({
        message: 'Превышено время ожидания',
        error: 'RequestTimeout',
      });
    } else {
      response.status(500).json({
        message: 'Внутренняя ошибка сервера',
        error: 'InternalServerError',
      });
    }
  }

  private handleQueryFailedError(
    exception: QueryFailedError,
    response: Response,
  ) {
    const errorMessage = exception.message.toLowerCase();

    // Обработка ошибок уникальности
    if (exception.code === 'ER_DUP_ENTRY' || exception.code === '23505') {
      if (
        errorMessage.includes('username') ||
        errorMessage.includes('user_username')
      ) {
        response.status(409).json({
          message: 'Имя пользователя уже занято',
          error: 'Conflict',
          statusCode: 409,
        });
      } else if (
        errorMessage.includes('telephone') ||
        errorMessage.includes('user_telephone')
      ) {
        response.status(409).json({
          message: 'Телефон уже используется',
          error: 'Conflict',
          statusCode: 409,
        });
      } else {
        response.status(409).json({
          message: 'Запись с таким идентификатором уже существует',
          error: 'Conflict',
          statusCode: 409,
        });
      }
    }
    // Обработка других SQL ошибок
    else if (exception.code === 'ER_NO_REFERENCED_ROW') {
      response.status(400).json({
        message: 'Связанная запись не найдена',
        error: 'BadRequest',
        details: { sqlError: exception.message },
      });
    } else {
      response.status(400).json({
        message: 'Неверный формат данных',
        error: 'BadRequest',
        details: { sqlError: exception.message },
      });
    }
  }
}
