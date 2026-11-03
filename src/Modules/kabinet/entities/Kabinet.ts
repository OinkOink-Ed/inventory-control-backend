import { Base } from "@common/entities/Base";
import type { Delivery } from "@Modules/delivery/entities/Delivery";
import type { Division } from "@Modules/division/entities/Division";
import type { User } from "@Modules/user/entities/User";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Kabinet extends Base {
  @Column()
  declare number: string;

  @OneToMany("Delivery", (delivery: Delivery) => delivery.kabinet)
  declare delivery: Delivery[];

  @ManyToOne("Division", (division: Division) => division.kabinets)
  declare division: Division;

  @ManyToOne("User", (user: User) => user.createdKabinets)
  declare creator: User;

  @ManyToMany("User", (user: User) => user.kabinets)
  declare users: User[];
}
