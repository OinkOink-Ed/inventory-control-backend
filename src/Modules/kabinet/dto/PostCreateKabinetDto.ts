import type { Kabinet } from '@Modules/kabinet/entities/Kabinet';
import {
  Assert,
  DivisionType,
  StrictDivisionType,
  StrictUserType,
  UserType,
} from '@Modules/kabinet/types/PostCreateKabinetTypes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PostCreateKabinetDto
  implements Pick<Assert & Kabinet, 'number'>, UserType, DivisionType
{
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  number: string;

  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'],
  })
  division: StrictDivisionType;

  creator: StrictUserType;
}
