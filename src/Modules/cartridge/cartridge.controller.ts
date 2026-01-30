import { ApiErrorResponses } from '@common/decorators/ApiErrorResponse';
import { Roles } from '@common/decorators/Roles';
import { UserData } from '@common/decorators/types/UserType';
import { User } from '@common/decorators/User';
import { RoleGuard } from '@common/guards/RoleGuard';
import { CartridgeService } from '@Modules/cartridge/cartridge.service';
import { GetResponseAllCartridgeInWarehouseDto } from '@Modules/cartridge/dto/GetResponseAllCartridgeInWarehouseDto';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetResponseCartridgeCountDto } from './dto/GetResponseCartridgeCountDto';

@ApiTags('Cartridges')
@Controller('cartridges')
@UseGuards(RoleGuard)
export class CartridgeController {
  constructor(private readonly cartridgeService: CartridgeService) {}

  @Get(':warehouseId')
  @Roles('admin', 'user')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Список картриджей отправлен',
    type: () => GetResponseAllCartridgeInWarehouseDto,
    isArray: true,
  })
  @ApiErrorResponses()
  async getCartridgesByWarehouse(
    @Param('warehouseId') warehouseId: number,
    @User('sub') userData: UserData,
  ): Promise<GetResponseAllCartridgeInWarehouseDto[]> {
    return await this.cartridgeService.getCartridgesByWarehouse(
      warehouseId,
      userData,
    );
  }

  @Get()
  @Roles('admin', 'user')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Количество картриджей',
    type: () => GetResponseCartridgeCountDto,
    isArray: true,
  })
  @ApiErrorResponses()
  async getCartridgesCount(
    @User('sub') userData: UserData,
  ): Promise<GetResponseCartridgeCountDto[]> {
    return await this.cartridgeService.getCartridgesCount(userData);
  }
}
