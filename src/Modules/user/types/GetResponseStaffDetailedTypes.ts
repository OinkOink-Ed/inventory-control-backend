import { AssertTManyProperty } from '@common/utils/typesUtils';
import { Cartridge } from '@Modules/cartridge/entities/Cartridge';
import { CartridgeModel } from '@Modules/cartridgeModel/entities/CartridgeModel';
import { CartridgeDelivery } from '@Modules/delivery/entities/CartridgeDelivery';
import { Delivery } from '@Modules/delivery/entities/Delivery';
import { Division } from '@Modules/division/entities/Division';
import { Kabinet } from '@Modules/kabinet/entities/Kabinet';
import { User } from '../entities/User';

export type Assert = AssertTManyProperty<Delivery, DivisionType> &
  AssertTManyProperty<Delivery, KabinetType> &
  AssertTManyProperty<Delivery, CartridgeDeliveryType> &
  AssertTManyProperty<User, StaffDeliveryType>;

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

type StrictCartridgeDeliveryType = Omit<
  Pick<CartridgeDelivery, 'id' | 'cartridge'>,
  'cartridge'
> &
  CartridgeType;
type CartridgeDeliveryType = Omit<
  Pick<Delivery, 'action' | 'id' | 'createdAt'>,
  'action'
> & {
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

export type StrictStaffDeliveryType = Omit<
  Pick<Delivery, 'action' | 'kabinet' | 'division'>,
  'action' | 'kabinet' | 'division'
> &
  CartridgeDeliveryType &
  KabinetType &
  DivisionType;
export type StaffDeliveryType = Omit<
  Pick<User, 'acceptedCartridge'>,
  'acceptedCartridge'
> & {
  acceptedCartridge: StrictStaffDeliveryType[];
};
