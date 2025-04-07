import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WarehouseStatus } from '../types/WarehouseStatus';
import type { Division } from './Division';
import type { User } from './User';
import type { Cartridge } from './Cartridge';
import type { Movement } from './Movement';
import type { Receiving } from './Receiving';
import type { Decommissioning } from './Decommissioning';
import { Delivery } from './Delivery';

@Entity()
export class Warehouse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  openningDate: Date;

  @Column()
  closingDate: Date;

  @Column({
    type: 'enum',
    enum: WarehouseStatus,
    default: WarehouseStatus.ISOPEN,
  })
  state: WarehouseStatus;

  @OneToOne('Division', (division: Division) => division.warehouse, {
    nullable: true,
  })
  division: Division;

  @ManyToOne('User', (user: User) => user.createdWarehouses, {
    cascade: ['insert'],
  })
  creator: User;

  @OneToMany('Cartridge', (cartridge: Cartridge) => cartridge.warehouse)
  cartridges: Cartridge[];

  @OneToMany('Movement', (movement: Movement) => movement.warehouseFrom)
  movementOut: Movement[];

  @OneToMany('Movement', (movement: Movement) => movement.warehouseWhere)
  movementIn: Movement[];

  @OneToMany('Receiving', (receiving: Receiving) => receiving.warehouse)
  receiving: Receiving[];

  @OneToMany(
    'Decommissioning',
    (decommissioning: Decommissioning) => decommissioning.warehouse,
  )
  decommissioning: Decommissioning[];

  @OneToMany('Delivery', (delivery: Delivery) => delivery.warehouse)
  delivery: Delivery[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
