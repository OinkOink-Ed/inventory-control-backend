import { ApiProperty } from '@nestjs/swagger';
import { CartridgeStatus } from 'src/common/enums/CartridgeStatus';
import { CartridgeModelBaseResponseDto } from 'src/Modules/cartridgeModel/dto/CartridgeModelBaseResponseDto';
import { CartridgeDecommissioning } from 'src/Modules/decommissioning/entities/CartridgeDecommissioning';
import { CartridgeDelivery } from 'src/Modules/delivery/entities/CartridgeDelivery';
import { CartridgeMovementBaseResponseDto } from 'src/Modules/movement/dto/CartridgeMovementBaseResponseDto';
import { CartridgeReceivingBaseDto } from 'src/Modules/receiving/dto/CartridgeReceivingBaseDto';
import { UserBaseResponseDto } from 'src/Modules/user/dto/UserBaseResponseDto';
import { WarehouseBaseResponseDto } from 'src/Modules/warehouse/dto/WarehouseBaseResponseDto';

export class CartridgeBaseResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty({
    enum: CartridgeStatus,
    enumName: 'CartridgeStatus',
  })
  state: CartridgeStatus;

  @ApiProperty({
    type: () => CartridgeModelBaseResponseDto,
  })
  model: CartridgeModelBaseResponseDto;

  @ApiProperty({
    type: () => CartridgeMovementBaseResponseDto,
  })
  actionMovement: CartridgeMovementBaseResponseDto;

  @ApiProperty({
    type: () => CartridgeReceivingBaseDto,
  })
  actionReceiving: CartridgeReceivingBaseDto;

  // CartridgeDecommissioning должен быть DTO
  @ApiProperty({
    type: () => CartridgeDecommissioning,
  })
  actionDecommissioning: CartridgeDecommissioning;

  // CartridgeDelivery должен быть DTO
  @ApiProperty({
    type: () => CartridgeDelivery,
  })
  actionDelivery: CartridgeDelivery;

  @ApiProperty({
    type: () => WarehouseBaseResponseDto,
  })
  warehouse: WarehouseBaseResponseDto;

  @ApiProperty({
    type: () => UserBaseResponseDto,
  })
  creator: UserBaseResponseDto;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
