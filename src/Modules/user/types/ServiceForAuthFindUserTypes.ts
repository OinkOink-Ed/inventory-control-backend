import type { Role } from '@Modules/role/entities/Role';
import type { User } from '../entities/User';
import { AssertTManyProperty } from '@common/utils/typesUtils';

export type Assert = AssertTManyProperty<User, RoleType>;

export type StrictRole = Pick<Role, 'roleName'>;
export type RoleType = Omit<Pick<User, 'role'>, 'role'> & {
  role: StrictRole;
};
