import { AssertTManyProperty } from '@common/utils/typesUtils';
import type { Cartridge } from '@Modules/cartridge/entities/Cartridge';
import type { CartridgeModel } from '@Modules/cartridgeModel/entities/CartridgeModel';
import type { Movement } from '@Modules/movement/entities/Movement';
import type { Staff } from '@Modules/staff/entities/Staff';
import type { User } from '@Modules/user/entities/User';
import type { Warehouse } from '@Modules/warehouse/entities/Warehouse';

export type Assert = AssertTManyProperty<Cartridge, ModelType> &
  AssertTManyProperty<Cartridge, WarehouseType> &
  AssertTManyProperty<Movement, WarehouseFromType> &
  AssertTManyProperty<Movement, WarehouseWhereType> &
  AssertTManyProperty<Movement, WhoAcceptedType> &
  AssertTManyProperty<Movement, UserType>;

export type StrictModelType = Pick<CartridgeModel, 'id'>;
export type ModelType = Omit<Pick<Cartridge, 'model'>, 'model'> & {
  model: StrictModelType;
};

export type StrictWarehouseType = Pick<Warehouse, 'id'>;
export type WarehouseType = Omit<Pick<Cartridge, 'warehouse'>, 'warehouse'> & {
  warehouse: StrictWarehouseType;
};

export type StrictWarehouseFromType = Pick<Warehouse, 'id'>;
export type WarehouseFromType = Omit<
  Pick<Movement, 'warehouseFrom'>,
  'warehouseFrom'
> & {
  warehouseFrom: StrictWarehouseFromType;
};

export type StrictWarehouseWhereType = Pick<Warehouse, 'id'>;
export type WarehouseWhereType = Omit<
  Pick<Movement, 'warehouseWhere'>,
  'warehouseWhere'
> & {
  warehouseWhere: StrictWarehouseWhereType;
};

export type StrictWhoAcceptedType = Pick<Staff, 'id'>;
export type WhoAcceptedType = Omit<
  Pick<Movement, 'whoAccepted'>,
  'whoAccepted'
> & {
  whoAccepted: StrictWhoAcceptedType;
};

export type StrictUserType = Pick<User, 'id'>;
export type UserType = Omit<Pick<Movement, 'creator'>, 'creator'> & {
  creator: StrictUserType;
};
