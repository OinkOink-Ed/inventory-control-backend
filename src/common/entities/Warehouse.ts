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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
