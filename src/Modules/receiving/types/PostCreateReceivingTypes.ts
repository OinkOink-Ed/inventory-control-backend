import { AssertTManyProperty } from '@common/utils/typesUtils';
import type { Cartridge } from '@Modules/cartridge/entities/Cartridge';
import type { CartridgeModel } from '@Modules/cartridgeModel/entities/CartridgeModel';
import type { User } from '@Modules/user/entities/User';
import type { Warehouse } from '@Modules/warehouse/entities/Warehouse';
import type { Receiving } from '../entities/Receiving';

export type Assert = AssertTManyProperty<Cartridge, ModelType> &
  AssertTManyProperty<Cartridge, WarehouseType> &
  AssertTManyProperty<Receiving, UserType>;

export type StrictModelType = Pick<CartridgeModel, 'id'>;
export type ModelType = Omit<Pick<Cartridge, 'model'>, 'model'> & {
  model: StrictModelType;
};

export type StrictWarehouseType = Pick<Warehouse, 'id'>;
export type WarehouseType = Omit<Pick<Cartridge, 'warehouse'>, 'warehouse'> & {
  warehouse: StrictWarehouseType;
};

export type StrictUserType = Pick<User, 'id'>;
export type UserType = Omit<Pick<Receiving, 'creator'>, 'creator'> & {
  creator: StrictUserType;
};
