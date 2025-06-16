import { ApiErrorResponses } from '@common/decorators/ApiErrorResponse';
import { CartridgeService } from '@Modules/cartridge/cartridge.service';
import { GetResponseAllCartridgeInWarehouseDto } from '@Modules/cartridge/dto/GetResponseAllCartridgeInWarehouseDto';
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Cartridges')
@Controller('cartridges')
export class CartridgeController {
  constructor(private readonly cartridgeService: CartridgeService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    type: GetResponseAllCartridgeInWarehouseDto,
    excludeExtraneousValues: true,
  })
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
