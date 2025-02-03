import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { User } from './user';

@Entity()
export class Movements {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  count: number;

  @Column()
  division: string;

  @Column()
  cabinet: number;

  @Column()
  modelCartridge: string;

  @Column()
  type: 'Reception' | 'Delivery';

  @ManyToOne(() => User, (user) => user.id, { cascade: ['insert'] })
  employee: Relation<User>;

  @CreateDateColumn()
  date: Date;
}
