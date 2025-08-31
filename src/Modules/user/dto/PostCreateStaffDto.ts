import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MinLength } from 'class-validator';
import { User } from '../entities/User';
import {
  Assert,
  StrictUserType,
  UserType,
} from '../types/PostCreateStaffTypes';

export class PostCreateStaffDto
  implements Pick<Assert & User, 'name' | 'lastname' | 'patronimyc'>, UserType
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

  creator: StrictUserType;
}
