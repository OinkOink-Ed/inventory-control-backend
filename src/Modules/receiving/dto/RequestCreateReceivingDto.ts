import { IntersectionType } from '@nestjs/mapped-types';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsPositive } from 'class-validator';
import { CartridgeStatus } from 'src/common/enums/CartridgeStatus';
import { CartridgeBaseDto } from 'src/Modules/cartridge/dto/CartridgeBaseDto';
import { CartridgeModelWithCreateReceivingDto } from 'src/Modules/cartridgeModel/dto/CartridgeModelWithCreateReceivingDto';
import { UserBaseDto } from 'src/Modules/user/dto/UserBaseDto';
import { WarehouseWhithCreateReceivingDto } from 'src/Modules/warehouse/dto/WarehouseWhithCreateReceivingDto';

export class RequestCreateReceivingDto extends IntersectionType(
  PickType(CartridgeBaseDto, ['state']),
  PickType(UserBaseDto, ['id']),
) {
  @ApiProperty({
    enum: CartridgeStatus,
    enumName: 'CartridgeStatus',
  })
  @IsEnum([CartridgeStatus.RECEIVED])
  state: CartridgeStatus.RECEIVED;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  count: number;

  @ApiProperty({
    type: () => CartridgeModelWithCreateReceivingDto,
  })
  model: CartridgeModelWithCreateReceivingDto;

  @ApiProperty({
    type: () => WarehouseWhithCreateReceivingDto,
  })
  warehouse: WarehouseWhithCreateReceivingDto;
}
