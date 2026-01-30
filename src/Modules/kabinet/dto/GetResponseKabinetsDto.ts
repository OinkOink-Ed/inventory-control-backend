import type { Kabinet } from '@Modules/kabinet/entities/Kabinet';
import {
  Assert,
  DivisionType,
  StrictDivisionType,
} from '@Modules/kabinet/types/GetResponseKabinetsTypes';
import { ApiProperty } from '@nestjs/swagger';

export class GetResponseKabinetsDto
  implements
    Pick<Assert & Kabinet, 'id' | 'number' | 'createdAt'>,
    DivisionType
{
  @ApiProperty()
  id: number;

  @ApiProperty()
  number: string;

  @ApiProperty({
    type: 'object',
    properties: {
      name: { type: 'string' },
    },
    required: ['name'],
  })
  division: StrictDivisionType;

  @ApiProperty({ type: 'string' })
  createdAt: Date;
}
