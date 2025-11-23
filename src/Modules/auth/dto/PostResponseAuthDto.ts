import { ApiProperty } from '@nestjs/swagger';
import {
  Assert,
  RoleType,
  StrictRole,
} from '../types/PostResponseAuthDtoTypes';
import type { User } from '@Modules/user/entities/User';

export class PostResponseAuthDto
  implements
    Pick<Assert & User, 'id' | 'name' | 'lastname' | 'patronimyc'>,
    RoleType
{
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  refresh_token: string;

  @ApiProperty()
  id: number;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  patronimyc: string;

  @ApiProperty({
    type: 'object',
    properties: {
      roleName: {
        type: 'string',
      },
    },
    required: ['roleName'],
  })
  role: StrictRole;
}
