import { Body, Controller, Post } from '@nestjs/common';
import { DecommissioningService } from './decommissioning.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiRequestTimeoutResponse,
} from '@nestjs/swagger';
import { SuccessResponse } from 'src/common/dto/SuccessResponseDto';
import { ErrorResponseDto } from 'src/common/dto/ErrorResponseDto';
import { PostCreateDecommissioningDto } from './dto/PostCreateDecommissioningDto';

@Controller('decommissioning')
export class DecommissioningController {
  constructor(
    private readonly decommissioningService: DecommissioningService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Картриджи успешно списаны',
    type: () => SuccessResponse,
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
    @Body() createDto: PostCreateDecommissioningDto,
  ): Promise<SuccessResponse> {
    return await this.decommissioningService.create(createDto);
  }
}
