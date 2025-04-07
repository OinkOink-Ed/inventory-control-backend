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
import type { User } from './User';
import type { Kabinet } from './Kabinet';
import type { Warehouse } from './Warehouse';
import type { Delivery } from './Delivery';

@Entity()
export class Division {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @OneToOne('Warehouse', (warehouse: Warehouse) => warehouse.division, {
    cascade: ['insert'],
  })
  @JoinColumn()
  warehouse: Warehouse;

  @OneToMany('User', (user: User) => user.division)
  users: User[];

  @OneToMany('Kabinet', (kabinet: Kabinet) => kabinet.division)
  kabinet: Kabinet[];

  @OneToMany('Delivery', (delivery: Delivery) => delivery.division)
  delivery: Delivery[];

  @ManyToOne('User', (user: User) => user.createdDivisions)
  creator: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
