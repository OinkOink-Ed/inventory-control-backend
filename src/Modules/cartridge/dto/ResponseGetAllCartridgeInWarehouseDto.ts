import { ApiProperty, PickType } from '@nestjs/swagger';
import { CartridgeBaseDto } from './CartridgeBaseDto';
import { CartridgeStatus } from 'src/common/enums/CartridgeStatus';
import { IsEnum, IsObject, ValidateNested } from 'class-validator';
import { WarehouseWhithGetAllCartridgeDto } from 'src/Modules/warehouse/dto/WarehouseWhithGetAllCartridgeDto';
import { CartridgeModelWithCreateReceivingDto } from 'src/Modules/cartridgeModel/dto/CartridgeModelWithCreateReceivingDto';
import { Type } from 'class-transformer';

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
  @IsObject()
  @ValidateNested()
  @Type(() => WarehouseWhithGetAllCartridgeDto)
  warehouse: WarehouseWhithGetAllCartridgeDto;

  @ApiProperty({
    type: () => CartridgeModelWithCreateReceivingDto,
  })
  @IsObject()
  @ValidateNested()
  @Type(() => CartridgeModelWithCreateReceivingDto)
  model: CartridgeModelWithCreateReceivingDto;
}
