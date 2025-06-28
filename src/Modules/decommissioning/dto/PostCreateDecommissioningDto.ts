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
import type { Warehouse } from '@Modules/warehouse/entities/Warehouse';
import type { User } from '@Modules/user/entities/User';
import { AssertTManyProperty } from '@common/utils/typesUtils';

type AssertDecommissioning = AssertTManyProperty<
  Decommissioning,
  {
    warehouse: Pick<Warehouse, 'id'>;
    creator: Pick<User, 'id'>;
  }
>;

type AssertCartridge = AssertTManyProperty<
  Cartridge,
  {
    model: Pick<Cartridge, 'id'>;
  }
>;

type StrictWarehouseType = Pick<Warehouse, 'id'>;
type StrictCreatorType = Pick<User, 'id'>;
type StrictCartridgeModelType = Pick<Cartridge, 'id'>;

type WarehouseType = { warehouse: Pick<Warehouse, 'id'> };
type CreatorType = { creator: Pick<User, 'id'> };
type CartridgeModelType = { model: Pick<Cartridge, 'id'> };

export class PostCreateDecommissioningDto
  implements
    Pick<
      Decommissioning & Cartridge & AssertCartridge & AssertDecommissioning,
      'comment' | 'state'
    >,
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
