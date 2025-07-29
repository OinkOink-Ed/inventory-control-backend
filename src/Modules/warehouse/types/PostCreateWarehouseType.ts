import type { User } from '@Modules/user/entities/User';
import type { Warehouse } from '../entities/Warehouse';
import { AssertTManyProperty } from '@common/utils/typesUtils';

export type Assert = AssertTManyProperty<Warehouse, CreatorType>;

export type StrictCreator = Pick<User, 'id'>;
export type CreatorType = Omit<Pick<Warehouse, 'creator'>, 'creator'> & {
  creator: StrictCreator;
};
