import { ApiErrorResponses } from '@common/decorators/ApiErrorResponse';
import { CartridgeService } from '@Modules/cartridge/cartridge.service';
import { GetResponseAllCartridgeInWarehouseDto } from '@Modules/cartridge/dto/GetResponseAllCartridgeInWarehouseDto';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Cartridges')
@Controller('cartridges')
export class CartridgeController {
  constructor(private readonly cartridgeService: CartridgeService) {}

  @Get(':warehouseId')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Список картриджей отправлен',
    type: () => GetResponseAllCartridgeInWarehouseDto,
    isArray: true,
  })
  @ApiErrorResponses()
  async getCartridgesById(
    @Param('warehouseId') warehouseId: number,
  ): Promise<GetResponseAllCartridgeInWarehouseDto[]> {
    return await this.cartridgeService.getCartridgesById(warehouseId);
  }
}
