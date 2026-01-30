import { AssertTManyProperty } from '@common/utils/typesUtils';
import { Division } from '@Modules/division/entities/Division';
import type { Kabinet } from '@Modules/kabinet/entities/Kabinet';
import type { User } from '@Modules/user/entities/User';

export type Assert = AssertTManyProperty<Kabinet, UserType> &
  AssertTManyProperty<Kabinet, DivisionType>;

export type StrictUserType = Pick<User, 'id'>;
export type UserType = Omit<Pick<Kabinet, 'creator'>, 'creator'> & {
  creator: StrictUserType;
};

export type StrictDivisionType = Pick<Division, 'id'>;
export type DivisionType = Omit<Pick<Kabinet, 'division'>, 'division'> & {
  division: StrictDivisionType;
};
