import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { User } from './User';
import type { Division } from './Division';

@Entity()
export class Kabinet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: string;

  @ManyToOne('Division', (division: Division) => division.kabinets, {
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
