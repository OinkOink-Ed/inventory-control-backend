import {
  ErrorResponseDto400,
  ErrorResponseDto401,
  ErrorResponseDto403,
  ErrorResponseDto404,
  ErrorResponseDto408,
  ErrorResponseDto500,
} from '@common/dto/ErrorResponseDto';
import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiResponseOptions } from '@nestjs/swagger';

interface ErrorResponseConfig {
  status: number;
  description: string;
  type?: any; // Для случаев, если нужен отдельный DTO
}

const statusToDtoMap = {
  400: ErrorResponseDto400,
  401: ErrorResponseDto401,
  403: ErrorResponseDto403,
  404: ErrorResponseDto404,
  408: ErrorResponseDto408,
  500: ErrorResponseDto500,
};

export function ApiErrorResponses(errors: ErrorResponseConfig[] = []) {
  const defaultErrors: ErrorResponseConfig[] = [
    {
      status: 400,
      description:
        'Неверный формат данных, дубликат записи или отсутствие связанной записи',
    },
    {
      status: 401,
      description: 'Авторизация не пройдена',
    },
    {
      status: 403,
      description: 'Доступ запрещен',
    },
    {
      status: 404,
      description: 'Ресурс не найден',
    },
    {
      status: 408,
      description: 'Превышено время ожидания',
    },
    {
      status: 500,
      description: 'Внутренняя ошибка сервера',
    },
  ];

  const errorResponses: ApiResponseOptions[] = [
    ...defaultErrors,
    ...errors,
  ].map(({ status, description, type }) => ({
    status,
    description,
    type: type || statusToDtoMap[status], // Используем маппинг или базовый DTO
  }));

  return applyDecorators(
    ...errorResponses.map((options) => ApiResponse(options)),
  );
}
