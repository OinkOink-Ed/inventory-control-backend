import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import type { User } from './User';
import type { Kabinet } from './Kabinet';
import type { Warehouse } from './Warehouse';
import type { Delivery } from './Delivery';
import { Base } from 'src/common/entities/Base';

@Entity()
export class Division extends Base {
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
}
