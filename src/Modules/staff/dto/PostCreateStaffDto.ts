import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MinLength } from 'class-validator';
import type { Staff } from '../entities/Staff';
import type { User } from '@Modules/user/entities/User';

type AssertStaffHasCreator = Staff extends { creator: any } ? Staff : never;

type CreatorType = { creator: Pick<User, 'id'> };

export class PostCreateStaffDto
  implements
    Pick<AssertStaffHasCreator, 'name' | 'lastname' | 'patronimyc'>,
    CreatorType
{
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

  creator: { id: number };
}
