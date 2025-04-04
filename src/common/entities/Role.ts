import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  // Relation,
  UpdateDateColumn,
} from 'typeorm';
import type { User } from './User';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roleName: string;

  // @ManyToOne(() => User, (user) => user.createdRoles)
  // creator: User;

  @OneToMany('User', (user: User) => user.role)
  users: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
