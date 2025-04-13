import { Body, Controller, Get } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiRequestTimeoutResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CartridgeService } from 'src/Modules/cartridge/cartridge.service';
import { ErrorResponseDto } from 'src/common/dto/ErrorResponseDto';
import { RequestGetAllCartridgeInWarehouseDto } from './dto/RequestGetAllCartridgeInWarehouseDto';
import { ResponseGetAllCartridgeInWarehouseDto } from './dto/ResponseGetAllCartridgeInWarehouseDto';
import { SuccessResponse } from 'src/common/dto/SuccessResponseDto';

@ApiTags('Cartridges')
@Controller('cartridges')
export class CartridgeController {
  constructor(private readonly cartridgeService: CartridgeService) {}

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
