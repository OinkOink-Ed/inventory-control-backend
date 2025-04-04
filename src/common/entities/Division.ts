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
import { User } from './User';
import { Kabinet } from './Kabinet';
import { Warehouse } from './Warehouse';

@Entity()
export class Division {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @OneToOne(() => Warehouse, (warehouse) => warehouse.division)
  warehouse: Warehouse;

  @OneToMany(() => User, (user) => user.division)
  users: User[];

  @OneToMany(() => Kabinet, (kabinet) => kabinet.division)
  kabinets: Kabinet[];

  @ManyToOne(() => User, (user) => user.createdDivisions)
  creator: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
