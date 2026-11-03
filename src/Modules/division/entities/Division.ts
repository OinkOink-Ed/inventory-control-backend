import { Base } from "@common/entities/Base";
import type { Delivery } from "@Modules/delivery/entities/Delivery";
import type { Kabinet } from "@Modules/kabinet/entities/Kabinet";
import type { User } from "@Modules/user/entities/User";
import type { Warehouse } from "@Modules/warehouse/entities/Warehouse";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";

@Entity()
export class Division extends Base {
  @Column()
  declare name: string;

  @Column()
  declare location: string;

  @OneToOne("Warehouse", (warehouse: Warehouse) => warehouse.division)
  @JoinColumn()
  declare warehouse: Warehouse;

  @ManyToMany("User", (user: User) => user.division)
  declare users: User[];

  @OneToMany("Kabinet", (kabinets: Kabinet) => kabinets.division)
  declare kabinets: Kabinet[];

  @OneToMany("Delivery", (delivery: Delivery) => delivery.division)
  declare delivery: Delivery[];

  @ManyToOne("User", (user: User) => user.createdDivisions)
  declare creator: User;
}
