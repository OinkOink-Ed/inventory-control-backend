import type { Division } from '@Modules/division/entities/Division';
import type { Role } from '@Modules/role/entities/Role';
import type { User } from '../entities/User';
import { AssertTManyProperty } from '@common/utils/typesUtils';

export type StrictRole = Pick<Role, 'id' | 'roleName'>;
export type RoleType = Omit<Pick<User, 'role'>, 'role'> & {
  role: StrictRole;
};

export type StrictDivision = Pick<Division, 'id' | 'name'>;
export type Divisiontype = Omit<Pick<User, 'division'>, 'division'> & {
  division: StrictDivision[];
};

export type Assert = AssertTManyProperty<User, RoleType> &
  AssertTManyProperty<User, Divisiontype>;
