import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiRequestTimeoutResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CartridgesService } from 'src/Modules/cartridge/cartridge.service';
import { ErrorResponseDto } from 'src/common/dto/ErrorResponseDto';
import { RequsestCreateCartridgeDto } from './dto/RequsestCreateCartridgeDto';
import { RequestGetAllCartridgeInWarehouseDto } from './dto/RequestGetAllCartridgeInWarehouseDto';
import { ResponseGetAllCartridgeInWarehouseDto } from './dto/ResponseGetAllCartridgeInWarehouseDto';
import { SuccessResponse } from 'src/common/dto/SuccessResponseDto';

@ApiTags('Cartridges')
@Controller('cartridges')
export class CartridgesController {
  constructor(private readonly cartridgeService: CartridgesService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Картриджи успешно добавлены',
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
    @Body() createDto: RequsestCreateCartridgeDto,
  ): Promise<SuccessResponse> {
    await this.cartridgeService.createMany(createDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Картриджи успешно добавлены',
    };
  }

  @Get()
  @ApiOkResponse({
    description: 'Список картриджей отправлен',
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
  async getAll(
    @Body() getDto: RequestGetAllCartridgeInWarehouseDto,
  ): Promise<ResponseGetAllCartridgeInWarehouseDto[]> {
    return await this.cartridgeService.getAll(getDto);
  }
}
