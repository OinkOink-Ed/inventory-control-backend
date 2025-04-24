import { ErrorResponseDto } from '@common/dto/ErrorResponseDto';
import { CartridgeService } from '@Modules/cartridge/cartridge.service';
import { GetAllCartridgeInWarehouseDto } from '@Modules/cartridge/dto/GetAllCartridgeInWarehouseDto';
import { GetResponseAllCartridgeInWarehouseDto } from '@Modules/cartridge/dto/GetResponseAllCartridgeInWarehouseDto';
import { Body, Controller, Get } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiRequestTimeoutResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Cartridges')
@Controller('cartridges')
export class CartridgeController {
  constructor(private readonly cartridgeService: CartridgeService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Список картриджей отправлен',
    type: () => GetResponseAllCartridgeInWarehouseDto,
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
    @Body() getDto: GetAllCartridgeInWarehouseDto,
  ): Promise<GetResponseAllCartridgeInWarehouseDto[]> {
    return await this.cartridgeService.getAll(getDto);
  }
}
