import { AssertTManyProperty } from '@common/utils/typesUtils';
import type { Role } from '@Modules/role/entities/Role';
import type { User } from '../entities/User';
import type { Division } from '@Modules/division/entities/Division';
import { Kabinet } from '@Modules/kabinet/entities/Kabinet';

export type Assert = AssertTManyProperty<User, CreatorType> &
  AssertTManyProperty<User, RoleType> &
  AssertTManyProperty<User, Divisiontype> &
  AssertTManyProperty<User, Kabinetstype>;

export type StrictRole = Pick<Role, 'id'>;
export type RoleType = Omit<Pick<User, 'role'>, 'role'> & {
  role: StrictRole;
};

export type StrictDivision = Pick<Division, 'id'>;
export type Divisiontype = Omit<Pick<User, 'division'>, 'division'> & {
  division: StrictDivision[];
};

export type StrictKabinets = Pick<Kabinet, 'id'>;
export type Kabinetstype = Omit<Pick<User, 'kabinets'>, 'kabinets'> & {
  kabinets: StrictKabinets[];
};

export type StrictCreator = Pick<User, 'id'>;
export type CreatorType = Omit<Pick<User, 'creator'>, 'creator'> & {
  creator: StrictCreator;
};
