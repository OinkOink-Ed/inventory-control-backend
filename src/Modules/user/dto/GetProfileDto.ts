import { ApiProperty } from '@nestjs/swagger';
import type { User } from '@Modules/user/entities/User';
import {
  Assert,
  RoleType,
  StrictRole,
} from '../types/ServiceForAuthFindUserTypes';

export class GetProfileDto
  implements
    Pick<Assert & User, 'id' | 'name' | 'lastname' | 'patronimyc'>,
    RoleType
{
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
