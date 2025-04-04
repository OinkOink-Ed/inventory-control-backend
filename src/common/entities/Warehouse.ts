import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WarehouseStatus } from '../types/WarehouseStatus';
import { Division } from './Division';
import { User } from './User';
import { Cartridge } from './Cartridge';

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

  @OneToOne(() => Division, (division) => division.warehouse)
  @JoinColumn()
  division: Division;

  @ManyToOne(() => User, (user) => user.createdWarehouses)
  creator: User;

  @OneToMany(() => Cartridge, (cartridge) => cartridge.warehouse)
  cartridges: Cartridge[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
