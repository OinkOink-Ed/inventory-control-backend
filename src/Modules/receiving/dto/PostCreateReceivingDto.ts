import { CartridgeStatus } from '@common/enums/CartridgeStatus';
import type { Cartridge } from '@Modules/cartridge/entities/Cartridge';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, ValidateNested } from 'class-validator';
import {
  Assert,
  ModelType,
  StrictModelType,
  StrictUserType,
  StrictWarehouseType,
  UserType,
  WarehouseType,
} from '../types/PostCreateReceivingTypes';
import { Type } from 'class-transformer';
import { ObjectIdDto } from '@common/dto/ObjectIdDto';

export class PostCreateReceivingDto
  implements
    Pick<Assert & Cartridge, 'state'>,
    ModelType,
    UserType,
    WarehouseType
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

  creator: StrictUserType;

  state: CartridgeStatus.RECEIVED;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  count: number;
}
