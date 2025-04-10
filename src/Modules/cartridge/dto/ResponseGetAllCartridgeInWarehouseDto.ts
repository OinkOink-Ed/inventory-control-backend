import { ApiProperty, PickType } from '@nestjs/swagger';
import { CartridgeBase } from './CartridgeBase';
import { CartridgeStatus } from 'src/common/enums/CartridgeStatus';
import { IsEnum } from 'class-validator';
import { WarehouseWhithGetAllCartridgeDto } from 'src/Modules/warehouse/dto/WarehouseWhithGetAllCartridgeDto';

export class ResponseGetAllCartridgeInWarehouseDto extends PickType(
  CartridgeBase,
  ['id', 'model', 'state', 'createdAt'],
) {
  @ApiProperty({
    enum: CartridgeStatus,
    enumName: 'CartridgeStatus',
  })
  @IsEnum(CartridgeStatus)
  state: CartridgeStatus;

  @ApiProperty({
    type: () => WarehouseWhithGetAllCartridgeDto,
  })
  warehouse: WarehouseWhithGetAllCartridgeDto;
}
