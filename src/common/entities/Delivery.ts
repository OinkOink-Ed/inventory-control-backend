import { Entity, ManyToOne, OneToMany } from 'typeorm';
import type { CartridgeDelivery } from './CartridgeDelivery';
import type { User } from './User';
import type { Warehouse } from './Warehouse';
import type { Division } from './Division';
import type { Kabinet } from './Kabinet';
import { Base } from 'src/common/entities/Base';

@Entity()
export class Delivery extends Base {
  @OneToMany(
    'CartridgeDelivery',
    (cartridgeDelivery: CartridgeDelivery) => cartridgeDelivery.delivery,
  )
  action: CartridgeDelivery[];

  @ManyToOne('User', (user: User) => user.createdDelivery, {
    cascade: ['insert'],
  })
  creator: User;

  @ManyToOne('Kabinet', (kabinet: Kabinet) => kabinet.delivery)
  kabinet: Kabinet;

  @ManyToOne('Division', (division: Division) => division.delivery)
  division: Division;

  @ManyToOne('Warehouse', (warehouse: Warehouse) => warehouse.delivery)
  warehouse: Warehouse;
}
