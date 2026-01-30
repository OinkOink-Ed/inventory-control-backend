import { ApiProperty } from '@nestjs/swagger';
import type { CartridgeModel } from '../entities/CartridgeModel';
import {
  Assert,
  CreatorType,
  StrictCreatorType,
} from '../types/GetResponseAllDetailedCartridgeModelTypes';

export class GetResponseAllDetailedCartridgeModelDto
  implements
    Pick<CartridgeModel & Assert, 'id' | 'name' | 'createdAt'>,
    CreatorType
{
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
      lastname: { type: 'string' },
      name: { type: 'string' },
      patronimyc: { type: 'string' },
    },
    required: ['id', 'lastname', 'name', 'patronimyc'],
  })
  creator: StrictCreatorType;

  @ApiProperty({ type: 'string' })
  createdAt: Date;
}
