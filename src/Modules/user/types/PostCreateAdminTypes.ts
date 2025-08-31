import { AssertTManyProperty } from '@common/utils/typesUtils';
import type { Role } from '@Modules/role/entities/Role';
import type { User } from '../entities/User';
import { Division } from '@Modules/division/entities/Division';

export type Assert = AssertTManyProperty<User, CreatorType> &
  AssertTManyProperty<User, RoleType> &
  AssertTManyProperty<User, Divisiontype>;

export type StrictRole = Pick<Role, 'id'>;
export type RoleType = Omit<Pick<User, 'role'>, 'role'> & {
  role: StrictRole;
};

export type StrictDivision = Pick<Division, 'id' | 'name'>;
export type Divisiontype = Omit<Pick<User, 'division'>, 'division'> & {
  division: StrictDivision[];
};

export type StrictCreator = Pick<User, 'id'>;
export type CreatorType = Omit<Pick<User, 'creator'>, 'creator'> & {
  creator: StrictCreator;
};
