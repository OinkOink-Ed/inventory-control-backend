import { ObjectIdDto } from '@common/dto/ObjectIdDto';
import { CartridgeStatus } from '@common/enums/CartridgeStatus';
import type { Cartridge } from '@Modules/cartridge/entities/Cartridge';
import {
  Assert,
  ModelType,
  StrictModelType,
  StrictUserType,
  StrictWarehouseFromType,
  StrictWarehouseType,
  StrictWarehouseWhereType,
  StrictWhoAcceptedType,
  UserType,
  WarehouseFromType,
  WarehouseType,
  WarehouseWhereType,
  WhoAcceptedType,
} from '@Modules/movement/types/PostCreateMovementTypes';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsPositive, ValidateNested } from 'class-validator';

export class PostCreateMovementDto
  implements
    Pick<Assert & Cartridge, 'state'>,
    ModelType,
    WarehouseType,
    WarehouseFromType,
    WarehouseWhereType,
    WhoAcceptedType,
    UserType
{
  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'],
  })
  @Type(() => ObjectIdDto)
  @ValidateNested()
  model: StrictModelType;

  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'],
  })
  @Type(() => ObjectIdDto)
  @ValidateNested()
  warehouse: StrictWarehouseType;

  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'],
  })
  @Type(() => ObjectIdDto)
  @ValidateNested()
  warehouseFrom: StrictWarehouseFromType;

  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'],
  })
  @Type(() => ObjectIdDto)
  @ValidateNested()
  warehouseWhere: StrictWarehouseWhereType;

  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'],
  })
  @Type(() => ObjectIdDto)
  @ValidateNested()
  whoAccepted: StrictWhoAcceptedType;

  creator: StrictUserType;

  state: CartridgeStatus.MOVED;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  count: number;
}
