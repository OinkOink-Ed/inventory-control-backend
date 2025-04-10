import { ApiProperty, PickType } from '@nestjs/swagger';
import { CartridgeBase } from './CartridgeBase';
import { CartridgeStatus } from 'src/common/enums/CartridgeStatus';
import { IsEnum, IsNumber } from 'class-validator';
import { WarehouseWhithCreateManyCartridgeDto } from 'src/Modules/warehouse/dto/WarehouseWhithCreateManyCartridgeDto';

export class RequsestCreateCartridgeDto extends PickType(CartridgeBase, [
  'model',
  'state',
]) {
  @ApiProperty({
    enum: CartridgeStatus,
    enumName: 'CartridgeStatus',
  })
  @IsEnum([CartridgeStatus.RECEIVED])
  state: CartridgeStatus.RECEIVED;

  @ApiProperty()
  @IsNumber()
  count: number;

  @ApiProperty({
    type: () => WarehouseWhithCreateManyCartridgeDto,
  })
  warehouse: WarehouseWhithCreateManyCartridgeDto;
}
