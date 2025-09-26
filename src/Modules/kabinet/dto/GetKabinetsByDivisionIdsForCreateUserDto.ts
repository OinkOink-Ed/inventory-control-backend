import type { Kabinet } from '@Modules/kabinet/entities/Kabinet';
import {
  Assert,
  DivisionType,
  StrictDivisionType,
} from '@Modules/kabinet/types/GetKabinetsByDivisionIdsForCreateUserTypes';
import { ApiProperty } from '@nestjs/swagger';

export class GetKabinetsByDivisionIdsForCreateUserDto
  implements Pick<Assert & Kabinet, 'id' | 'number'>, DivisionType
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
}
