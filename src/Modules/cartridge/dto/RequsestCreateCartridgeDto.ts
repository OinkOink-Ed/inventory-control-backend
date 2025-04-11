import { ApiProperty, PickType } from '@nestjs/swagger';
import { CartridgeBaseDto } from './CartridgeBaseDto';
import { CartridgeStatus } from 'src/common/enums/CartridgeStatus';
import { IsEnum, IsNumber } from 'class-validator';
import { WarehouseWhithCreateManyCartridgeDto } from 'src/Modules/warehouse/dto/WarehouseWhithCreateManyCartridgeDto';
import { IntersectionType } from '@nestjs/mapped-types';

export class RequsestCreateCartridgeDto extends IntersectionType(
  PickType(CartridgeBaseDto, ['model', 'state']),
  PickType(UserBase, []),
) {
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
