import { ApiErrorResponses } from '@common/decorators/ApiErrorResponse';
import { CartridgeService } from '@Modules/cartridge/cartridge.service';
import { GetAllCartridgeInWarehouseDto } from '@Modules/cartridge/dto/GetAllCartridgeInWarehouseDto';
import { GetResponseAllCartridgeInWarehouseDto } from '@Modules/cartridge/dto/GetResponseAllCartridgeInWarehouseDto';
import { Body, Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

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
  @ApiErrorResponses()
  async getAll(
    @Body() getDto: GetAllCartridgeInWarehouseDto,
  ): Promise<GetResponseAllCartridgeInWarehouseDto[]> {
    return await this.cartridgeService.getAll(getDto);
  }
}
