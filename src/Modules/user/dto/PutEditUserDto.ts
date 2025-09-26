import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  Matches,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ObjectIdDto } from '@common/dto/ObjectIdDto';
import {
  Assert,
  Divisiontype,
  Kabinetstype,
  LastnameType,
  NameType,
  PatronimycType,
  RoleType,
  StrictDivision,
  StrictKabinets,
  StrictLastname,
  StrictName,
  StrictPatronimyc,
  StrictRole,
  StrictTelephone,
  StrictUsername,
  TelephoneType,
  UsernameType,
} from '../types/PutEditUserTypes';
import { User } from '../entities/User';

export class PutEditUserDto
  implements
    Pick<Assert & User, never>,
    RoleType,
    Divisiontype,
    Kabinetstype,
    TelephoneType,
    PatronimycType,
    LastnameType,
    NameType,
    UsernameType
{
  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsString()
  @Matches(/^\S+$/)
  @MinLength(4)
  username: StrictUsername | undefined;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsString()
  @Matches(/^\S+$/)
  @MinLength(4)
  name: StrictName | undefined;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsString()
  @Matches(/^\S+$/)
  @MinLength(4)
  lastname: StrictLastname | undefined;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsString()
  @Matches(/^\+7[0-9]{10}$/)
  telephone: StrictTelephone | undefined;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsString()
  @Matches(/^\S+$/)
  patronimyc: StrictPatronimyc | undefined;

  @ApiPropertyOptional({
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
  })
  @IsOptional()
  @Type(() => ObjectIdDto)
  @ValidateNested()
  role: StrictRole | undefined;

  @ApiPropertyOptional({
    type: 'array',
    items: {
      properties: {
        id: { type: 'number' },
      },
    },
  })
  @IsOptional()
  @Type(() => ObjectIdDto)
  @ValidateNested({ each: true })
  division: StrictDivision[] | undefined;

  @ApiPropertyOptional({
    type: 'array',
    items: {
      properties: {
        id: { type: 'number' },
      },
    },
  })
  @IsOptional()
  @Type(() => ObjectIdDto)
  @ValidateNested({ each: true })
  kabinets: StrictKabinets[] | undefined;
}
