import { Entity, ManyToOne, OneToMany } from 'typeorm';
import type { CartridgeDelivery } from './CartridgeDelivery';
import type { User } from '../../user/entities/User';
import type { Warehouse } from '../../warehouse/entities/Warehouse';
import type { Division } from '../../division/entities/Division';
import type { Kabinet } from '../../kabinet/entities/Kabinet';
import { Base } from 'src/common/entities/Base';

@Entity()
export class Delivery extends Base {
  @OneToMany(
    'CartridgeDelivery',
    (cartridgeDelivery: CartridgeDelivery) => cartridgeDelivery.delivery,
  )
  action: CartridgeDelivery[];

  @ManyToOne('User', (user: User) => user.createdDelivery)
  creator: User;

  @ManyToOne('Kabinet', (kabinet: Kabinet) => kabinet.delivery)
  kabinet: Kabinet;

  @ManyToOne('Division', (division: Division) => division.delivery)
  division: Division;

  @ManyToOne('Warehouse', (warehouse: Warehouse) => warehouse.delivery)
  warehouse: Warehouse;
}
