import { CartridgeStatus } from '@common/enums/CartridgeStatus';
import { ApiProperty } from '@nestjs/swagger';
import type { Cartridge } from '../entities/Cartridge';
import {
  Assert,
  CartridgeModelType,
  StrictCartridgeModelType,
  StrictWarehouseType,
  WarehouseType,
} from '../types/GetResponseAllCartridgeInWarehouseTypes';

export class GetResponseAllCartridgeInWarehouseDto
  implements
    Pick<Assert & Cartridge, 'id' | 'state' | 'createdAt'>,
    CartridgeModelType,
    WarehouseType
{
  @ApiProperty()
  id: number;

  @ApiProperty({
    enum: CartridgeStatus,
    enumName: 'CartridgeStatus',
  })
  state: CartridgeStatus;

  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
    },
    required: ['id', 'name'],
  })
  warehouse: StrictWarehouseType;

  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
    },
    required: ['id', 'name'],
  })
  model: StrictCartridgeModelType;

  @ApiProperty({ type: 'string' })
  createdAt: Date;
}
