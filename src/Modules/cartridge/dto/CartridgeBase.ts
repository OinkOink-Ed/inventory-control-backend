import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';
import { CartridgeStatus } from 'src/common/enums/CartridgeStatus';
import { CartridgeDecommissioning } from 'src/Modules/decommissioning/entities/CartridgeDecommissioning';
import { CartridgeDelivery } from 'src/Modules/delivery/entities/CartridgeDelivery';
import { CartridgeMovement } from 'src/Modules/movement/entities/CartridgeMovement';
import { CartridgeReceiving } from 'src/Modules/receiving/entities/CartridgeReceiving';
import { User } from 'src/Modules/user/entities/User';
import { WarehouseBase } from 'src/Modules/warehouse/dto/WarehouseBase';

export class CartridgeBase {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty({
    enum: CartridgeStatus,
    enumName: 'CartridgeStatus',
  })
  @IsEnum(CartridgeStatus)
  state: CartridgeStatus;

  @ApiProperty()
  @IsNumber()
  model: number;

  // CartridgeMovement должен быть DTO
  @ApiProperty({
    type: () => CartridgeMovement,
  })
  actionMovement: CartridgeMovement;

  // CartridgeReceiving должен быть DTO
  @ApiProperty({
    type: () => CartridgeReceiving,
  })
  actionReceiving: CartridgeReceiving;

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
    type: () => WarehouseBase,
  })
  warehouse: WarehouseBase;

  // User должен быть DTO
  @ApiProperty({
    type: () => User,
  })
  creator: User;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
