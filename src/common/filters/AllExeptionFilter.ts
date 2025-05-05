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
export class AllExeptionFilter implements ExceptionFilter {
  // ArgumentsHost - предоставляет контекст выполнения (HTTP, WebSocket и т.д.), чтобы получить доступ к запросу/ответу
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    // Response Тип из Express, представляющий объект HTTP-ответа, чтобы вручную задавать статус и тело ответа.
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();

      //Тут происходит подготовка ответа и отправка его клиенту
      response.status(status).json(exception.getResponse());
    } else if (exception instanceof QueryFailedError) {
      if (exception.code === 'ER_DUP_ENTRY') {
        response.status(400).json({
          message: 'Запись с таким идентификатором существует',
          error: 'BadRequest',
          details: { sqlError: exception.message },
        });
      } else if (exception.code === 'ER_NO_REFERENCED_ROW') {
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
}
