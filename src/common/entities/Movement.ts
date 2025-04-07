import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { CartridgeMovement } from './CartridgeMovement';
import type { Warehouse } from './Warehouse';
import type { User } from './User';

@Entity()
export class Movement {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne('User', (user: User) => user.createdMovement, {
    cascade: ['insert'],
  })
  creator: User;

  @OneToMany(
    'CartridgeMovement',
    (cartridgeMovement: CartridgeMovement) => cartridgeMovement.movement,
  )
  action: CartridgeMovement[];

  @ManyToOne('Warehouse', (warehouse: Warehouse) => warehouse.movementOut)
  warehouseFrom: Warehouse;

  @ManyToOne('Warehouse', (warehouse: Warehouse) => warehouse.movementIn)
  warehouseWhere: Warehouse;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
