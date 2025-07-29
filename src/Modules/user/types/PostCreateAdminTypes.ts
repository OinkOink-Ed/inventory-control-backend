import { AssertTManyProperty } from '@common/utils/typesUtils';
import type { Role } from '@Modules/role/entities/Role';
import type { User } from '../entities/User';

export type Assert = AssertTManyProperty<User, CreatorType> &
  AssertTManyProperty<User, RoleType>;

export type StrictRole = Pick<Role, 'id'>;
export type RoleType = Omit<Pick<User, 'role'>, 'role'> & {
  role: StrictRole;
};

export type StrictCreator = Pick<User, 'id'>;
export type CreatorType = Omit<Pick<User, 'creator'>, 'creator'> & {
  creator: StrictCreator;
};
