import { Entity, ManyToOne, OneToMany } from 'typeorm';
import type { User } from './User';
import type { Warehouse } from './Warehouse';
import type { CartridgeReceiving } from './CartridgeReceiving';
import { Base } from 'src/common/entities/Base';

@Entity()
export class Receiving extends Base {
  @ManyToOne('User', (user: User) => user.createdReceiving, {
    cascade: ['insert'],
  })
  creator: User;

  @ManyToOne('Warehouse', (warehouse: Warehouse) => warehouse.receiving)
  warehouse: Warehouse;

  @OneToMany(
    'CartridgeReceiving',
    (cartridgeReceiving: CartridgeReceiving) => cartridgeReceiving.receiving,
  )
  action: CartridgeReceiving[];
}
