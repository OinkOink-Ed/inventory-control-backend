import { AssertTManyProperty } from '@common/utils/typesUtils';
import type { User } from '@Modules/user/entities/User';
import type { Staff } from '../entities/Staff';

export type Assert = AssertTManyProperty<Staff, UserType>;

export type StrictUserType = Pick<User, 'id'>;
export type UserType = Omit<Pick<Staff, 'creator'>, 'creator'> & {
  creator: StrictUserType;
};
