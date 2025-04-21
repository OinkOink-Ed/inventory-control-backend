import { ApiProperty } from '@nestjs/swagger';
import { WarehouseStatus } from 'src/common/enums/WarehouseStatus';
import { CartridgeBaseResponseDto } from 'src/Modules/cartridge/dto/CartridgeBaseResponseDto';
import { Decommissioning } from 'src/Modules/decommissioning/entities/Decommissioning';
import { Delivery } from 'src/Modules/delivery/entities/Delivery';
import { Division } from 'src/Modules/division/entities/Division';
import { Movement } from 'src/Modules/movement/entities/Movement';
import { ReceivingBaseDto } from 'src/Modules/receiving/dto/ReceivingBaseResponseDto';
import { UserBaseResponseDto } from 'src/Modules/user/dto/UserBaseResponseDto';

export class WarehouseBaseResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  openningDate: Date;

  @ApiProperty()
  closingDate: Date;

  @ApiProperty({
    enum: WarehouseStatus,
    enumName: 'WarehouseStatus',
  })
  state: WarehouseStatus;

  // Должен быть DTO
  @ApiProperty({
    type: () => Division,
  })
  division: Division;

  @ApiProperty({
    type: () => UserBaseResponseDto,
  })
  creator: UserBaseResponseDto;

  @ApiProperty({
    type: () => CartridgeBaseResponseDto,
  })
  cartridges: CartridgeBaseResponseDto[];

  //Должен быть DTO
  @ApiProperty({
    type: () => Movement,
  })
  movementOut: Movement[];

  //Должен быть DTO
  @ApiProperty({
    type: () => Movement,
  })
  movementIn: Movement[];

  @ApiProperty({
    type: () => ReceivingBaseDto,
  })
  receiving: ReceivingBaseDto[];

  //Здесь должно быть DTO
  @ApiProperty({
    type: () => Decommissioning,
  })
  decommissioning: Decommissioning[];

  //Здесь должно быть DTO
  @ApiProperty({
    type: () => Delivery,
  })
  delivery: Delivery[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
