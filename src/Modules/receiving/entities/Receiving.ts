import { Entity, ManyToOne, OneToMany } from 'typeorm';
import type { User } from '../../user/entities/User';
import type { Warehouse } from '../../warehouse/entities/Warehouse';
import type { CartridgeReceiving } from './CartridgeReceiving';
import { Base } from 'src/common/entities/Base';

@Entity()
export class Receiving extends Base {
  @ManyToOne('User', (user: User) => user.createdReceiving)
  creator: User;

  @ManyToOne('Warehouse', (warehouse: Warehouse) => warehouse.receiving)
  warehouse: Warehouse;

  @OneToMany(
    'CartridgeReceiving',
    (cartridgeReceiving: CartridgeReceiving) => cartridgeReceiving.receiving,
  )
  action: CartridgeReceiving[];
}
