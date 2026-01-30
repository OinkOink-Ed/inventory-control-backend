import { AssertTManyProperty } from '@common/utils/typesUtils';
import type { Role } from '@Modules/role/entities/Role';
import type { User } from '../entities/User';
import type { Division } from '@Modules/division/entities/Division';
import { Kabinet } from '@Modules/kabinet/entities/Kabinet';

export type Assert = AssertTManyProperty<User, RoleType> &
  AssertTManyProperty<User, Divisiontype> &
  AssertTManyProperty<User, Kabinetstype> &
  AssertTManyProperty<User, TelephoneType> &
  AssertTManyProperty<User, PatronimycType> &
  AssertTManyProperty<User, LastnameType> &
  AssertTManyProperty<User, NameType> &
  AssertTManyProperty<User, UsernameType>;

export type StrictRole = Pick<Role, 'id'>;
export type RoleType = Omit<Pick<User, 'role'>, 'role'> & {
  role: StrictRole | undefined;
};

export type StrictDivision = Pick<Division, 'id'>;
export type Divisiontype = Omit<Pick<User, 'division'>, 'division'> & {
  division: StrictDivision[] | undefined;
};

export type StrictKabinets = Pick<Kabinet, 'id'>;
export type Kabinetstype = Omit<Pick<User, 'kabinets'>, 'kabinets'> & {
  kabinets: StrictKabinets[] | undefined;
};

export type StrictTelephone = string;
export type TelephoneType = Omit<Pick<User, 'telephone'>, 'telephone'> & {
  telephone: StrictTelephone | undefined;
};

export type StrictPatronimyc = string;
export type PatronimycType = Omit<Pick<User, 'patronimyc'>, 'patronimyc'> & {
  patronimyc: StrictPatronimyc | undefined;
};

export type StrictLastname = string;
export type LastnameType = Omit<Pick<User, 'lastname'>, 'lastname'> & {
  lastname: StrictLastname | undefined;
};

export type StrictName = string;
export type NameType = Omit<Pick<User, 'name'>, 'name'> & {
  name: StrictName | undefined;
};

export type StrictUsername = string;
export type UsernameType = Omit<Pick<User, 'username'>, 'username'> & {
  username: StrictUsername | undefined;
};
