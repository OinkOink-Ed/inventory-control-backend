import { AssertTManyProperty } from '@common/utils/typesUtils';
import type { User } from '@Modules/user/entities/User';
import type { Role } from '../entities/Role';

export type Assert = AssertTManyProperty<Role, UserType>;

export type StrictUserType = Pick<User, 'id'>;
export type UserType = Omit<Pick<Role, 'creator'>, 'creator'> & {
  creator: StrictUserType;
};
