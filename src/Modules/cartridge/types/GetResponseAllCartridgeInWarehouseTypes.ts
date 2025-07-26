import { AssertTManyProperty } from '@common/utils/typesUtils';
import type { Cartridge } from '../entities/Cartridge';
import type { Warehouse } from '@Modules/warehouse/entities/Warehouse';
import type { CartridgeModel } from '@Modules/cartridgeModel/entities/CartridgeModel';

export type Assert = AssertTManyProperty<Cartridge, CartridgeModelType> &
  AssertTManyProperty<Cartridge, WarehouseType>;

export type StrictCartridgeModelType = Pick<CartridgeModel, 'id' | 'name'>;
export type StrictWarehouseType = Pick<Warehouse, 'id' | 'name'>;

export type CartridgeModelType = Omit<Pick<Cartridge, 'model'>, 'model'> & {
  model: StrictCartridgeModelType;
};
export type WarehouseType = Omit<Pick<Cartridge, 'warehouse'>, 'warehouse'> & {
  warehouse: StrictWarehouseType;
};
