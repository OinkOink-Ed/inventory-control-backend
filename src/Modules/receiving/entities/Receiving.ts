import { Base } from '@common/entities/Base';
import type { CartridgeReceiving } from '@Modules/receiving/entities/CartridgeReceiving';
import type { User } from '@Modules/user/entities/User';
import type { Warehouse } from '@Modules/warehouse/entities/Warehouse';
import { Entity, ManyToOne, OneToMany } from 'typeorm';

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
