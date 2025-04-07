import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { CartridgeDelivery } from './CartridgeDelivery';
import type { User } from './User';
import type { Warehouse } from './Warehouse';
import type { Division } from './Division';
import type { Kabinet } from './Kabinet';

@Entity()
export class Delivery {
  @PrimaryGeneratedColumn()
  id: number;

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
