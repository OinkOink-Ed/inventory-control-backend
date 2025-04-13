import { ApiProperty, PickType } from '@nestjs/swagger';
import { CartridgeBaseDto } from './CartridgeBaseDto';
import { CartridgeStatus } from 'src/common/enums/CartridgeStatus';
import { IsEnum } from 'class-validator';
import { WarehouseWhithGetAllCartridgeDto } from 'src/Modules/warehouse/dto/WarehouseWhithGetAllCartridgeDto';
import { CartridgeModelWithCreateReceivingDto } from 'src/Modules/cartridgeModel/dto/CartridgeModelWithCreateReceivingDto';

export class ResponseGetAllCartridgeInWarehouseDto extends PickType(
  CartridgeBaseDto,
  ['id', 'state', 'createdAt'],
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

  @ApiProperty({
    type: () => CartridgeModelWithCreateReceivingDto,
  })
  model: CartridgeModelWithCreateReceivingDto;
}
