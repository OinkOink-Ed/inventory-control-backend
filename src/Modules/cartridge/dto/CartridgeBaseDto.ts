import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';
import { CartridgeStatus } from 'src/common/enums/CartridgeStatus';
import { CartridgeModelBaseDto } from 'src/Modules/cartridgeModel/dto/CartridgeModelBaseDto';
import { CartridgeDecommissioning } from 'src/Modules/decommissioning/entities/CartridgeDecommissioning';
import { CartridgeDelivery } from 'src/Modules/delivery/entities/CartridgeDelivery';
import { CartridgeMovement } from 'src/Modules/movement/entities/CartridgeMovement';
import { CartridgeReceivingBaseDto } from 'src/Modules/receiving/dto/CartridgeReceivingBaseDto';
import { UserBaseDto } from 'src/Modules/user/dto/UserBaseDto';
import { WarehouseBaseDto } from 'src/Modules/warehouse/dto/WarehouseBaseDto';

export class CartridgeBaseDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty({
    enum: CartridgeStatus,
    enumName: 'CartridgeStatus',
  })
  @IsEnum(CartridgeStatus)
  state: CartridgeStatus;

  @ApiProperty({
    type: () => CartridgeModelBaseDto,
  })
  model: CartridgeModelBaseDto;

  // CartridgeMovement должен быть DTO
  @ApiProperty({
    type: () => CartridgeMovement,
  })
  actionMovement: CartridgeMovement;

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
    type: () => WarehouseBaseDto,
  })
  warehouse: WarehouseBaseDto;

  @ApiProperty({
    type: () => UserBaseDto,
  })
  creator: UserBaseDto;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
