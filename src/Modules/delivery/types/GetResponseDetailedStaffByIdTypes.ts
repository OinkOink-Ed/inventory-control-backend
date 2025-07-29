import type { Cartridge } from '@Modules/cartridge/entities/Cartridge';
import type { CartridgeModel } from '@Modules/cartridgeModel/entities/CartridgeModel';
import type { CartridgeDelivery } from '../entities/CartridgeDelivery';
import type { Delivery } from '../entities/Delivery';
import type { Kabinet } from '@Modules/kabinet/entities/Kabinet';
import type { Division } from '@Modules/division/entities/Division';
import { AssertTManyProperty } from '@common/utils/typesUtils';

export type Assert = AssertTManyProperty<Delivery, DivisionType> &
  AssertTManyProperty<Delivery, KabinetType> &
  AssertTManyProperty<Delivery, CartridgeDeliveryType>;

type StrictModelType = Pick<CartridgeModel, 'name'>;
type Model = Omit<Pick<Cartridge, 'model' | 'id'>, 'model'> & {
  model: StrictModelType;
};

type StrictCartridgeType = Omit<Pick<Cartridge, 'id' | 'model'>, 'model'> &
  Model;
type CartridgeType = Omit<
  Pick<CartridgeDelivery, 'cartridge' | 'id'>,
  'cartridge'
> & {
  cartridge: StrictCartridgeType;
};

export type StrictCartridgeDeliveryType = Omit<
  Pick<CartridgeDelivery, 'id' | 'cartridge'>,
  'cartridge'
> &
  CartridgeType;

export type CartridgeDeliveryType = Omit<Pick<Delivery, 'action'>, 'action'> & {
  action: StrictCartridgeDeliveryType[];
};

export type StrictKabinetType = Pick<Kabinet, 'number'>;
export type KabinetType = Omit<Pick<Delivery, 'kabinet'>, 'kabinet'> & {
  kabinet: StrictKabinetType;
};

export type StrictDivisionType = Pick<Division, 'name'>;
export type DivisionType = Omit<Pick<Delivery, 'division'>, 'division'> & {
  division: StrictDivisionType;
};
