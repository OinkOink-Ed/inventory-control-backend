import { UserStatus } from '@common/enums/UserStatus';
import { ApiProperty } from '@nestjs/swagger';
import type { User } from '../entities/User';
import type { Role } from '@Modules/role/entities/Role';
import type { Division } from '@Modules/division/entities/Division';

type AssertUserHasRoleAndDivision = User extends { role: any; division: any }
  ? User
  : never;

type RoleType = { role: Pick<Role, 'id' | 'roleName'> };
type Divisiontype = { division: Pick<Division, 'id' | 'name'> };

export class GetResponseAllUserDto
  implements
    Pick<
      AssertUserHasRoleAndDivision,
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
  })
  role: { id: number; roleName: string };

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
  })
  division: { id: number; name: string };
}
