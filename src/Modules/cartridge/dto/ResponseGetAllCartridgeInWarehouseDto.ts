import { ApiProperty, PickType } from '@nestjs/swagger';
import { CartridgeBaseResponseDto } from './CartridgeBaseResponseDto';
import { CartridgeStatus } from 'src/common/enums/CartridgeStatus';
import { ResponseWithGetAllCartridgeDto } from 'src/Modules/warehouse/dto/ResponseWithGetAllCartridgeDto';

export class ResponseGetAllCartridgeInWarehouseDto extends PickType(
  CartridgeBaseResponseDto,
  ['id', 'state', 'createdAt'],
) {
  @ApiProperty({
    enum: CartridgeStatus,
    enumName: 'CartridgeStatus',
  })
  state: CartridgeStatus;

  @ApiProperty({
    type: () => ResponseWithGetAllCartridgeDto,
  })
  warehouse: ResponseWithGetAllCartridgeDto;

  @ApiProperty({
    type: () => CartridgeModelWithCreateReceivingDto,
  })
  model: CartridgeModelWithCreateReceivingDto;
}
