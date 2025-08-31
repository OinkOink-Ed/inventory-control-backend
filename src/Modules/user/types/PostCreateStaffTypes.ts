import { AssertTManyProperty } from '@common/utils/typesUtils';
import type { User } from '@Modules/user/entities/User';

export type Assert = AssertTManyProperty<User, UserType>;

export type StrictUserType = Pick<User, 'id'>;
export type UserType = Omit<Pick<User, 'creator'>, 'creator'> & {
  creator: StrictUserType;
};
