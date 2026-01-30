import { ObjectIdDto } from '@common/dto/ObjectIdDto';
import type { Kabinet } from '@Modules/kabinet/entities/Kabinet';
import {
  Assert,
  DivisionType,
  StrictDivisionType,
  StrictUserType,
  UserType,
} from '@Modules/kabinet/types/PostCreateKabinetTypes';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

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
  @Type(() => ObjectIdDto)
  @ValidateNested()
  division: StrictDivisionType;

  creator: StrictUserType;
}
