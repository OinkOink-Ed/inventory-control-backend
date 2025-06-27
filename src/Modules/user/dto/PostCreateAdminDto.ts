import { ObjectIdDto } from '@common/dto/ObjectIdDto';
import { UserStatus } from '@common/enums/UserStatus';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
  ValidateNested,
} from 'class-validator';
import type { User } from '../entities/User';
import type { Role } from '@Modules/role/entities/Role';
import { AssertTManyProperty } from '@common/utils/typesUtils';

type Assert = AssertTManyProperty<
  User,
  {
    role: Pick<Role, 'id'>;
  }
>;
type StrictRole = Pick<Role, 'id'>;
type RoleType = { role: StrictRole };

type StrictCreator = Pick<User, 'id'>;
type CreatorType = { creator: StrictCreator };

export class PostCreateAdminDto
  implements
    Pick<
      User & Assert,
      | 'username'
      | 'password'
      | 'name'
      | 'lastname'
      | 'patronimyc'
      | 'telephone'
      | 'state'
    >,
    CreatorType,
    RoleType
{
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(/^\S+$/)
  @MinLength(4)
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(/^\S+$/)
  @MinLength(8)
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(/^\S+$/)
  @MinLength(4)
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(/^\S+$/)
  @MinLength(4)
  lastname: string;

  @ApiProperty()
  @IsString()
  @Matches(/^\S+$/)
  patronimyc: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(/^\+79[0-9]{9}$/)
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
    enum: UserStatus,
  })
  @IsIn([UserStatus.ACTIVE])
  state: UserStatus.ACTIVE;

  creator: StrictCreator;
}
