import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiRequestTimeoutResponse,
} from '@nestjs/swagger';
import { ErrorResponseDto } from 'src/common/dto/ErrorResponseDto';
import { SuccessResponseDto } from 'src/common/dto/SuccessResponseDto';
import { DeliveryService } from 'src/Modules/delivery/delivery.service';
import { PostCreateDeliveryDto } from 'src/Modules/delivery/dto/PostCreateDeliveryDto';

@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Картриджи успешно выданы',
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
    @Body() createDto: PostCreateDeliveryDto,
  ): Promise<SuccessResponseDto> {
    return await this.deliveryService.create(createDto);
  }
}
