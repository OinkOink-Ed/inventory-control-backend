import { Base } from '@common/entities/Base';
import type { User } from '@Modules/user/entities/User';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Role extends Base {
  @Column()
  roleName: string;

  @ManyToOne('User', (user: User) => user.createdRoles, {
    nullable: true,
  })
  creator: User;

  @OneToMany('User', (user: User) => user.role)
  users: User[];
}
