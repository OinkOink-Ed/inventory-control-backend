import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MinLength } from 'class-validator';
import {
  Assert,
  StrictUserType,
  UserType,
} from '../types/PostCreateStaffTypes';
import type { Staff } from '../entities/Staff';

export class PostCreateStaffDto
  implements Pick<Assert & Staff, 'name' | 'lastname' | 'patronimyc'>, UserType
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
