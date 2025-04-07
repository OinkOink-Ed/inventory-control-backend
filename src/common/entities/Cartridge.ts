import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CartridgeStatus } from '../types/CartridgeStatus';
import type { Warehouse } from './Warehouse';
import type { User } from './User';

@Entity()
export class Cartridge {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: CartridgeStatus,
    default: CartridgeStatus.RECEIVED,
  })
  state: CartridgeStatus;

  @Column()
  model: number;

  @ManyToOne('Warehouse', (warehouse: Warehouse) => warehouse.cartridges, {
    cascade: ['insert'],
  })
  warehouse: Warehouse;

  @ManyToOne('User', (user: User) => user.createdCartridges, {
    cascade: ['insert'],
  })
  creator: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
