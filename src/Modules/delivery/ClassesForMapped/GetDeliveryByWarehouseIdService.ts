import { ApiProperty } from '@nestjs/swagger';
import type { Delivery } from '../entities/Delivery';
import {
  Assert,
  CartridgeDeliveryType,
  DivisionType,
  KabinetType,
  StaffType,
  StrictCartridgeDeliveryType,
  StrictDivisionType,
  StrictKabinetType,
  StrictStaffType,
  StrictUserType,
  StrictWarehouseType,
  UserType,
  WarehouseType,
} from '../types/GetDeliveryByWarehouseIdTypes';

export class GetDeliveryByWarehouseIdService
  implements
    Pick<Delivery & Assert, 'id' | 'createdAt'>,
    WarehouseType,
    DivisionType,
    KabinetType,
    UserType,
    StaffType,
    CartridgeDeliveryType
{
  @ApiProperty()
  id: number;

  @ApiProperty({
    type: 'object',
    properties: {
      name: { type: 'string' },
    },
    required: ['name'],
  })
  warehouse: StrictWarehouseType;

  @ApiProperty({
    type: 'object',
    properties: {
      name: { type: 'string' },
    },
    required: ['name'],
  })
  division: StrictDivisionType;

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
      lastname: { type: 'string' },
      patronimyc: { type: 'string' },
    },
    required: ['name', 'lastname', 'patronimyc'],
  })
  creator: StrictUserType;

  @ApiProperty({
    type: 'object',
    properties: {
      name: { type: 'string' },
      lastname: { type: 'string' },
      patronimyc: { type: 'string' },
    },
    required: ['name', 'lastname', 'patronimyc'],
  })
  accepting: StrictStaffType;

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

  @ApiProperty({ type: 'string' })
  createdAt: Date;
}
