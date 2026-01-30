import { AssertTManyProperty } from '@common/utils/typesUtils';
import type { CartridgeModel } from '../entities/CartridgeModel';
import type { User } from '@Modules/user/entities/User';

export type Assert = AssertTManyProperty<CartridgeModel, CreatorType>;

export type StrictCreatorType = Pick<User, 'id'>;
export type CreatorType = Omit<Pick<CartridgeModel, 'creator'>, 'creator'> & {
  creator: StrictCreatorType;
};
