import { UserStatus } from '@common/enums/UserStatus';
import { ApiProperty } from '@nestjs/swagger';
import type { User } from '../entities/User';
import {
  Assert,
  Divisiontype,
  RoleType,
  StrictDivision,
  StrictRole,
} from '../types/GetResponseAllUserTypes';

export class GetResponseAllUserDto
  implements
    Pick<
      User & Assert,
      'id' | 'name' | 'username' | 'patronimyc' | 'lastname' | 'state'
    >,
    RoleType,
    Divisiontype
{
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  patronimyc: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
      roleName: { type: 'string' },
    },
    required: ['id', 'roleName'],
  })
  role: StrictRole;

  @ApiProperty({
    enum: UserStatus,
    enumName: 'UserStatus',
  })
  state: UserStatus;

  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
    },
    required: ['id', 'name'],
  })
  division: StrictDivision;
}
