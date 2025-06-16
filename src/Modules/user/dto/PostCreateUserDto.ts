import { ObjectIdDto } from '@common/dto/ObjectIdDto';
import { UserStatus } from '@common/enums/UserStatus';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsIn,
  IsString,
  Matches,
  MinLength,
  ValidateNested,
} from 'class-validator';
import type { User } from '../entities/User';
import type { Role } from '@Modules/role/entities/Role';
import { CreatorType } from '@common/dto/types';
import type { Division } from '@Modules/division/entities/Division';

type AssertUserHasRoleAndCreatorAndDivision = User extends {
  role: any;
  creator: any;
  division: any;
}
  ? User
  : never;

type RoleType = { role: Pick<Role, 'id'> };
type DivisionType = { role: Pick<Division, 'id'> };

//Валится валидация
export class PostCreateUserDto
  implements
    Pick<
      AssertUserHasRoleAndCreatorAndDivision,
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
    DivisionType
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
  role: ObjectIdDto;

  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'],
  })
  @Type(() => ObjectIdDto)
  @ValidateNested()
  division: ObjectIdDto;

  @ApiProperty({
    enum: UserStatus,
  })
  @IsIn([UserStatus.ACTIVE])
  state: UserStatus.ACTIVE;

  creator: { id: number };
}
