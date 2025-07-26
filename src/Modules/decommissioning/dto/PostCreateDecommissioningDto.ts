import { ObjectIdDto } from '@common/dto/ObjectIdDto';
import { CartridgeStatus } from '@common/enums/CartridgeStatus';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import type { Decommissioning } from '../entities/Decommissioning';
import type { Cartridge } from '@Modules/cartridge/entities/Cartridge';
import {
  Assert,
  CartridgeModelType,
  CreatorType,
  StrictCartridgeModelType,
  StrictCreatorType,
  StrictWarehouseType,
  WarehouseType,
} from '../types/PostCreateDecommissioningTypes';

export class PostCreateDecommissioningDto
  implements
    Pick<Decommissioning & Cartridge & Assert, 'comment' | 'state'>,
    WarehouseType,
    CreatorType,
    CartridgeModelType
{
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  comment: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  count: number;

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

  creator: StrictCreatorType;
  state: CartridgeStatus.DECOMMISSIONED;

  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'],
  })
  @Type(() => ObjectIdDto)
  @ValidateNested()
  model: StrictCartridgeModelType;
}
