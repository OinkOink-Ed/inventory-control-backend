import { AssertTManyProperty } from '@common/utils/typesUtils';
import { Role } from '@Modules/role/entities/Role';
import { User } from '@Modules/user/entities/User';

export type Assert = AssertTManyProperty<User, RoleType>;

export type StrictRole = Pick<Role, 'roleName'>;
export type RoleType = Omit<Pick<User, 'role'>, 'role'> & {
  role: StrictRole;
};
