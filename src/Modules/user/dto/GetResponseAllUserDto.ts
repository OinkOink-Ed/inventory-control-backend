import { UserStatus } from '@common/enums/UserStatus';
import { ApiProperty } from '@nestjs/swagger';
import type { User } from '../entities/User';
import type { Role } from '@Modules/role/entities/Role';
import type { Division } from '@Modules/division/entities/Division';
import { AssertTManyProperty } from '@common/utils/typesUtils';

type StrictRole = Pick<Role, 'id' | 'roleName'>;
type StrictDivision = Pick<Division, 'id' | 'name'>;

type RoleType = { role: StrictRole };
type Divisiontype = { division: StrictDivision };

type Assert = AssertTManyProperty<
  User,
  {
    role: Pick<Role, 'id' | 'roleName'>;
    division: Pick<Division, 'id' | 'name'>;
  }
>;

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
