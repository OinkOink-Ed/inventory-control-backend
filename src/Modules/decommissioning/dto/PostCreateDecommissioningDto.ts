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

type AssertDecommissionigHasWarehouse =
  Decommissioning extends Pick<Decommissioning, 'warehouse' | 'creator'>
    ? Decommissioning
    : never;

type AssertDecommissioningModelAndCreator =
  Cartridge extends Pick<Cartridge, 'model'> ? Cartridge : never;

type WarehouseType = Pick<Warehouse, 'id'>;
type CreatorType = Pick<User, 'id'>;
type CartridgeModelType = Pick<Cartridge, 'id'>;

export class PostCreateDecommissioningDto
  implements
    Pick<
      Decommissioning &
        Cartridge &
        AssertDecommissionigHasWarehouse &
        AssertDecommissioningModelAndCreator,
      'comment' | 'creator' | 'model' | 'state' | 'warehouse'
    >
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
  warehouse: WarehouseType;

  creator: CreatorType;
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
  model: CartridgeModelType;
}
