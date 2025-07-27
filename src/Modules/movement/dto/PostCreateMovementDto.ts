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
import { IsNumber, IsPositive } from 'class-validator';

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
  model: StrictModelType;

  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'],
  })
  warehouse: StrictWarehouseType;

  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'],
  })
  warehouseFrom: StrictWarehouseFromType;

  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'],
  })
  warehouseWhere: StrictWarehouseWhereType;

  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'],
  })
  whoAccepted: StrictWhoAcceptedType;

  creator: StrictUserType;
  state: CartridgeStatus.MOVED;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  count: number;
}
