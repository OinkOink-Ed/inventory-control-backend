import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { User } from './User';
import type { Warehouse } from './Warehouse';
import type { CartridgeReceiving } from './CartridgeReceiving';

@Entity()
export class Receiving {
  @PrimaryGeneratedColumn()
  id: number;

  // там где ID добавить связи

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
