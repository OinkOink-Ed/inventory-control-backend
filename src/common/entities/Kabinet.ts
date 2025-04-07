import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { User } from './User';
import type { Division } from './Division';
import type { Delivery } from './Delivery';

@Entity()
export class Kabinet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: string;

  @OneToMany('Delivery', (delivery: Delivery) => delivery.kabinet)
  delivery: Delivery[];

  @ManyToOne('Division', (division: Division) => division.kabinet, {
    cascade: ['insert'],
  })
  division: Division;

  @ManyToOne('User', (user: User) => user.createdKabinets, {
    cascade: ['insert'],
  })
  creator: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
