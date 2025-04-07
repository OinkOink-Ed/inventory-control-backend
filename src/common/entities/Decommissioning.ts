import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { CartridgeDecommissioning } from './CartridgeDecommissioning';
import type { User } from './User';
import type { Warehouse } from './Warehouse';

@Entity()
export class Decommissioning {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  //Добавить связи где ID

  @OneToMany(
    'CartridgeDecommissioning',
    (cartridgeDecommissioning: CartridgeDecommissioning) =>
      cartridgeDecommissioning.decommissioning,
  )
  action: CartridgeDecommissioning[];

  @ManyToOne('User', (user: User) => user.createdDecommissioning, {
    cascade: ['insert'],
  })
  creator: User;

  @ManyToOne('Warehouse', (warehouse: Warehouse) => warehouse.decommissioning)
  warehouse: Warehouse;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
