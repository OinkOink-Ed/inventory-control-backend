import { Base } from "@common/entities/Base";
import { UserStatus } from "@common/enums/UserStatus";
import { RefreshToken } from "@Modules/auth/entities/RefreshToken";
import type { Cartridge } from "@Modules/cartridge/entities/Cartridge";
import type { CartridgeModel } from "@Modules/cartridgeModel/entities/CartridgeModel";
import type { Decommissioning } from "@Modules/decommissioning/entities/Decommissioning";
import type { Delivery } from "@Modules/delivery/entities/Delivery";
import type { Division } from "@Modules/division/entities/Division";
import { Kabinet } from "@Modules/kabinet/entities/Kabinet";
import type { Movement } from "@Modules/movement/entities/Movement";
import type { Receiving } from "@Modules/receiving/entities/Receiving";
import type { Role } from "@Modules/role/entities/Role";
import type { Warehouse } from "@Modules/warehouse/entities/Warehouse";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from "typeorm";

@Entity()
export class User extends Base {
  @Column({ unique: true })
  declare username: string;

  @Column()
  declare password: string;

  @Column()
  declare name: string;

  @Column()
  declare lastname: string;

  @Column({ nullable: true })
  declare patronymic: string;

  @Column(/*Позже сделать уникальным{ unique: true }*/)
  declare telephone: string;

  @Column({
    type: "enum",
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  declare state: UserStatus;

  @OneToMany(() => RefreshToken, (token) => token.user)
  declare refreshTokens: RefreshToken[];

  @ManyToMany("Kabinet", (kabinet: Kabinet) => kabinet.users)
  @JoinTable({ name: "user_workrooms" })
  declare kabinets: Kabinet[];

  @ManyToMany("Division", (division: Division) => division.users)
  @JoinTable({ name: "working_divisions_of_users" })
  declare division: Division[];

  @ManyToOne("Role", (role: Role) => role.users)
  declare role: Role;

  @ManyToOne("User", (user: User) => user.createdUsers)
  declare creator: User;

  @OneToMany("User", (user: User) => user.creator)
  declare createdUsers: User[];

  @OneToMany("Role", (role: Role) => role.creator)
  declare createdRoles: Role[];

  @OneToMany("Warehouse", (warehouse: Warehouse) => warehouse.creator)
  declare createdWarehouses: Warehouse[];

  @OneToMany("Division", (division: Division) => division.creator)
  declare createdDivisions: Division[];

  @OneToMany("Kabinet", (kabinet: Kabinet) => kabinet.creator)
  declare createdKabinets: Kabinet[];

  @OneToMany(
    "CartridgeModel",
    (cartridgeModel: CartridgeModel) => cartridgeModel.creator,
  )
  declare createdCartridgeModels: CartridgeModel[];

  @OneToMany("Cartridge", (cartridge: Cartridge) => cartridge.creator)
  declare createdCartridges: Cartridge[];

  @OneToMany("Movement", (movement: Movement) => movement.creator)
  declare createdMovement: Movement[];

  @OneToMany("Receiving", (receiving: Receiving) => receiving.creator)
  declare createdReceiving: Receiving[];

  @OneToMany(
    "Decommissioning",
    (decommissioning: Decommissioning) => decommissioning.creator,
  )
  declare createdDecommissioning: Decommissioning[];

  @OneToMany("Delivery", (delivery: Delivery) => delivery.creator)
  declare createdDelivery: Delivery[];

  @OneToMany("Delivery", (delivery: Delivery) => delivery.accepting)
  declare acceptedCartridge: Delivery[];
}
