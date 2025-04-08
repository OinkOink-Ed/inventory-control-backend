import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import type { User } from '../../user/entities/User';
import { Base } from 'src/common/entities/Base';

@Entity()
export class Role extends Base {
  @Column()
  roleName: string;

  @ManyToOne('User', (user: User) => user.createdRoles, {
    nullable: true,
    cascade: true,
  })
  creator: User;

  @OneToMany('User', (user: User) => user.role)
  users: User[];
}
