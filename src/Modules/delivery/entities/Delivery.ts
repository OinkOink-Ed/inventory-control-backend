import { Base } from '@common/entities/Base';
import type { CartridgeDelivery } from '@Modules/delivery/entities/CartridgeDelivery';
import type { Division } from '@Modules/division/entities/Division';
import type { Kabinet } from '@Modules/kabinet/entities/Kabinet';
import type { User } from '@Modules/user/entities/User';
import type { Warehouse } from '@Modules/warehouse/entities/Warehouse';
import { Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Delivery extends Base {
  @OneToMany(
    'CartridgeDelivery',
    (cartridgeDelivery: CartridgeDelivery) => cartridgeDelivery.delivery,
  )
  action: CartridgeDelivery[];

  @ManyToOne('User', (user: User) => user.createdDelivery)
  creator: User;

  @ManyToOne('User', (user: User) => user.acceptedCartridge)
  accepting: User;

  @ManyToOne('Kabinet', (kabinet: Kabinet) => kabinet.delivery)
  kabinet: Kabinet;

  @ManyToOne('Division', (division: Division) => division.delivery)
  division: Division;

  @ManyToOne('Warehouse', (warehouse: Warehouse) => warehouse.delivery)
  warehouse: Warehouse;
}
