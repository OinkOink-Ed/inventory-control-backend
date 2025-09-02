import type { Role } from '@Modules/role/entities/Role';
import type { User } from '../entities/User';
import { AssertTManyProperty } from '@common/utils/typesUtils';

export type StrictRole = Pick<Role, 'id' | 'roleName'>;
export type RoleType = Omit<Pick<User, 'role'>, 'role'> & {
  role: StrictRole;
};

export type Assert = AssertTManyProperty<User, RoleType> &
  AssertTManyProperty<User, User>;
