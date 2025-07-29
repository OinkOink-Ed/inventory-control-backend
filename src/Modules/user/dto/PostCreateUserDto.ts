import { UserStatus } from '@common/enums/UserStatus';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsString,
  Matches,
  MinLength,
  ValidateNested,
} from 'class-validator';
import {
  Assert,
  CreatorType,
  Divisiontype,
  RoleType,
  StrictCreator,
  StrictDivision,
  StrictRole,
} from '../types/PostCreateUserTypes';
import type { User } from '../entities/User';
import { Type } from 'class-transformer';
import { ObjectIdDto } from '@common/dto/ObjectIdDto';

export class PostCreateUserDto
  implements
    Pick<
      Assert & User,
      | 'username'
      | 'password'
      | 'name'
      | 'lastname'
      | 'patronimyc'
      | 'telephone'
      | 'state'
    >,
    CreatorType,
    RoleType,
    Divisiontype
{
  @ApiProperty()
  @IsString()
  @Matches(/^\S+$/)
  @MinLength(4)
  username: string;

  @ApiProperty()
  @IsString()
  @Matches(/^\S+$/)
  @MinLength(8)
  password: string;

  @ApiProperty()
  @IsString()
  @Matches(/^\S+$/)
  @MinLength(4)
  name: string;

  @ApiProperty()
  @IsString()
  @Matches(/^\S+$/)
  @MinLength(4)
  lastname: string;

  @ApiProperty()
  @IsString()
  @Matches(/^\S+$/)
  patronimyc: string;

  @ApiProperty()
  @IsString()
  @Matches(/^\+7[0-9]{10}$/)
  telephone: string;

  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'],
  })
  @Type(() => ObjectIdDto)
  @ValidateNested()
  role: StrictRole;

  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'],
  })
  @Type(() => ObjectIdDto)
  @ValidateNested()
  division: StrictDivision;

  @ApiProperty({
    enum: UserStatus,
  })
  @IsIn([UserStatus.ACTIVE])
  state: UserStatus.ACTIVE;

  creator: StrictCreator;
}
