import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CartridgeStatus } from '../types/CartridgeStatus';
import { Warehouse } from './Warehouse';
import { User } from './User';

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

  // Настроить связи там, где ID

  @Column()
  model: number;

  @ManyToOne(() => Warehouse, (warehouse) => warehouse.cartridges)
  warehouse: Warehouse;

  @ManyToOne(() => User, (user) => user.createdCartridges)
  creator: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
