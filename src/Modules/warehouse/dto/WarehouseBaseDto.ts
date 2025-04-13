import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { WarehouseStatus } from 'src/common/enums/WarehouseStatus';
import { CartridgeBaseDto } from 'src/Modules/cartridge/dto/CartridgeBaseDto';
import { Decommissioning } from 'src/Modules/decommissioning/entities/Decommissioning';
import { Delivery } from 'src/Modules/delivery/entities/Delivery';
import { Division } from 'src/Modules/division/entities/Division';
import { Movement } from 'src/Modules/movement/entities/Movement';
import { ReceivingBaseDto } from 'src/Modules/receiving/dto/ReceivingBaseDto';
import { UserBaseDto } from 'src/Modules/user/dto/UserBaseDto';

export class WarehouseBaseDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  openningDate: Date;

  @ApiProperty()
  closingDate: Date;

  @ApiProperty({
    enum: WarehouseStatus,
    enumName: 'WarehouseStatus',
  })
  @IsEnum(WarehouseStatus)
  state: WarehouseStatus;

  // Должен быть DTO
  @ApiProperty({
    type: () => Division,
  })
  division: Division;

  @ApiProperty({
    type: () => UserBaseDto,
  })
  creator: UserBaseDto;

  @ApiProperty({
    type: () => CartridgeBaseDto,
    isArray: true,
  })
  cartridges: CartridgeBaseDto[];

  //Должен быть DTO
  @ApiProperty({
    type: () => Movement,
    isArray: true,
  })
  movementOut: Movement[];

  //Должен быть DTO
  @ApiProperty({
    type: () => Movement,
    isArray: true,
  })
  movementIn: Movement[];

  @ApiProperty({
    type: () => ReceivingBaseDto,
    isArray: true,
  })
  receiving: ReceivingBaseDto[];

  //Здесь должно быть DTO
  @ApiProperty({
    type: () => Decommissioning,
    isArray: true,
  })
  decommissioning: Decommissioning[];

  //Здесь должно быть DTO
  @ApiProperty({
    type: () => Delivery,
    isArray: true,
  })
  delivery: Delivery[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
