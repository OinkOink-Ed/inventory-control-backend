import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
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

  @ManyToOne('User', (user: User) => user.createdRoles, {
    nullable: true,
    cascade: true,
  })
  creator: User;

  @OneToMany('User', (user: User) => user.role)
  users: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
