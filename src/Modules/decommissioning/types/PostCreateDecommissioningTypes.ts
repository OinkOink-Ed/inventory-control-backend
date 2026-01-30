import { AssertTManyProperty } from '@common/utils/typesUtils';
import type { Decommissioning } from '../entities/Decommissioning';
import type { Warehouse } from '@Modules/warehouse/entities/Warehouse';
import type { User } from '@Modules/user/entities/User';
import type { Cartridge } from '@Modules/cartridge/entities/Cartridge';

export type Assert = AssertTManyProperty<Cartridge, CartridgeModelType> &
  AssertTManyProperty<Decommissioning, CreatorType> &
  AssertTManyProperty<Decommissioning, WarehouseType>;

export type StrictWarehouseType = Pick<Warehouse, 'id'>;
export type StrictCreatorType = Pick<User, 'id'>;
export type StrictCartridgeModelType = Pick<Cartridge, 'id'>;

export type WarehouseType = Omit<
  Pick<Decommissioning, 'warehouse'>,
  'warehouse'
> & {
  warehouse: Pick<Warehouse, 'id'>;
};
export type CreatorType = Omit<Pick<Decommissioning, 'creator'>, 'creator'> & {
  creator: Pick<User, 'id'>;
};
export type CartridgeModelType = Omit<Pick<Cartridge, 'model'>, 'model'> & {
  model: Pick<Cartridge, 'id'>;
};
