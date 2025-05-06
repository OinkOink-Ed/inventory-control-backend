import { Base } from '@common/entities/Base';
import type { Delivery } from '@Modules/delivery/entities/Delivery';
import type { Kabinet } from '@Modules/kabinet/entities/Kabinet';
import type { User } from '@Modules/user/entities/User';
import type { Warehouse } from '@Modules/warehouse/entities/Warehouse';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity()
export class Division extends Base {
  @Column()
  name: string;

  @Column()
  location: string;

  @OneToOne('Warehouse', (warehouse: Warehouse) => warehouse.division)
  @JoinColumn()
  warehouse: Warehouse;

  @OneToMany('User', (user: User) => user.division)
  users: User[];

  @OneToMany('Kabinet', (kabinet: Kabinet) => kabinet.id)
  kabinet: Kabinet[];

  @OneToMany('Delivery', (delivery: Delivery) => delivery.division)
  delivery: Delivery[];

  @ManyToOne('User', (user: User) => user.createdDivisions)
  creator: User;
}
