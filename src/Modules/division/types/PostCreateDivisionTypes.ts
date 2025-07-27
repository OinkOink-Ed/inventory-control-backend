import { AssertTManyProperty } from '@common/utils/typesUtils';
import type { Division } from '@Modules/division/entities/Division';
import type { User } from '@Modules/user/entities/User';
import type { Warehouse } from '@Modules/warehouse/entities/Warehouse';

export type Assert = AssertTManyProperty<Division, UserType> &
  AssertTManyProperty<Division, WarehouseType>;

export type StrictUserType = Pick<User, 'id'>;
export type UserType = Omit<Pick<Division, 'creator'>, 'creator'> & {
  creator: StrictUserType;
};

export type StrictWarehouseType = Pick<Warehouse, 'id'>;
export type WarehouseType = Omit<Pick<Division, 'warehouse'>, 'warehouse'> & {
  warehouse: StrictWarehouseType;
};
