import { Base } from "@common/entities/Base";
import type { User } from "@Modules/user/entities/User";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Role extends Base {
  @Column()
  declare roleName: string;

  @ManyToOne("User", (user: User) => user.createdRoles, {
    nullable: true,
  })
  declare creator: User;

  @OneToMany("User", (user: User) => user.role)
  declare users: User[];
}
