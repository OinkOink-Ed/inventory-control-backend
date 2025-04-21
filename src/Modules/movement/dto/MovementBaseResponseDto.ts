import { ApiProperty } from '@nestjs/swagger';
import { CartridgeMovementBaseResponseDto } from 'src/Modules/movement/dto/CartridgeMovementBaseResponseDto';
import { UserBaseResponseDto } from 'src/Modules/user/dto/UserBaseResponseDto';
import { WarehouseBaseResponseDto } from 'src/Modules/warehouse/dto/WarehouseBaseResponseDto';

export class MovementBaseResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty({
    type: () => UserBaseResponseDto,
  })
  creator: UserBaseResponseDto;

  @ApiProperty({
    type: () => CartridgeMovementBaseResponseDto,
  })
  action: CartridgeMovementBaseResponseDto[];

  @ApiProperty({
    type: () => WarehouseBaseResponseDto,
  })
  warehouseFrom: WarehouseBaseResponseDto;

  @ApiProperty({
    type: () => WarehouseBaseResponseDto,
  })
  warehouseWhere: WarehouseBaseResponseDto;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
