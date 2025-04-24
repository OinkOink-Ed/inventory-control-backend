import { ErrorResponseDto } from '@common/dto/ErrorResponseDto';
import { SuccessResponseDto } from '@common/dto/SuccessResponseDto';
import { PostCreateMovementDto } from '@Modules/movement/dto/PostCreateMovementDto';
import { MovementService } from '@Modules/movement/movement.service';
import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiRequestTimeoutResponse,
} from '@nestjs/swagger';

@Controller('movement')
export class MovementController {
  constructor(private readonly movementService: MovementService) {}

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Картриджи успешно перемещены',
    type: () => SuccessResponseDto,
  })
  @ApiBadRequestResponse({
    description:
      'Неверный формат данных, дубликат записи или отсутствие связанной записи',
    type: () => ErrorResponseDto,
  })
  @ApiForbiddenResponse({
    description: 'Доступ запрещен',
    type: () => ErrorResponseDto,
  })
  @ApiRequestTimeoutResponse({
    description: 'Превышено время ожидания',
    type: () => ErrorResponseDto,
  })
  async create(
    @Body() createDto: PostCreateMovementDto,
  ): Promise<SuccessResponseDto> {
    return await this.movementService.create(createDto);
  }
}
