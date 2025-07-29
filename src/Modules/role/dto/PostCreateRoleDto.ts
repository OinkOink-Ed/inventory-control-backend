import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import type { Role } from '../entities/Role';
import { Assert, StrictUserType, UserType } from '../types/PostCreateroleTypes';

export class PostCreateroleDto
  implements Pick<Assert & Role, 'roleName'>, UserType
{
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  roleName: string;

  creator: StrictUserType;
}
