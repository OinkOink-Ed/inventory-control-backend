import { ApiProperty } from '@nestjs/swagger';
import type { Delivery } from '../entities/Delivery';
import {
  Assert,
  CartridgeDeliveryType,
  DivisionType,
  KabinetType,
  StrictCartridgeDeliveryType,
  StrictDivisionType,
  StrictKabinetType,
} from '../types/GetResponseDetailedStaffByIdTypes';

export class GetResponseDetailedStaffByIdService
  implements
    Pick<Assert & Delivery, 'id'>,
    CartridgeDeliveryType,
    KabinetType,
    DivisionType
{
  @ApiProperty()
  id: number;

  @ApiProperty({
    type: 'object',
    properties: {
      number: { type: 'string' },
    },
    required: ['number'],
  })
  kabinet: StrictKabinetType;

  @ApiProperty({
    type: 'object',
    properties: {
      name: { type: 'string' },
    },
    required: ['name'],
  })
  division: StrictDivisionType;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        cartridge: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            model: {
              type: 'object',
              properties: { name: { type: 'string' } },
              required: ['name'],
            },
          },
          required: ['id', 'model'],
        },
      },
      required: ['id', 'cartridge'],
    },
  })
  action: StrictCartridgeDeliveryType[];
}
