import { ApiProperty } from '@nestjs/swagger';
import {
  Assert,
  DivisionType,
  StrictDivision,
} from '../types/GetResponseAllDetailedWarehouseTypes';
import type { Warehouse } from '../entities/Warehouse';

export class GetResponseAllDetailedWarehouseDto
  implements
    Omit<Pick<Assert & Warehouse, 'division'>, 'division'>,
    DivisionType
{
  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
      kabinets: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            number: { type: 'string' },
          },
          required: ['id', 'number'],
        },
      },
    },
    required: ['id', 'kabinets'],
  })
  division: StrictDivision;
}
