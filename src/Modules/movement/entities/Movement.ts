import { Base } from "@common/entities/Base";
import type { CartridgeMovement } from "@Modules/movement/entities/CartridgeMovement";
import type { User } from "@Modules/user/entities/User";
import type { Warehouse } from "@Modules/warehouse/entities/Warehouse";
import { Entity, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Movement extends Base {
  @ManyToOne("User", (user: User) => user.createdMovement)
  declare creator: User;

  @OneToMany(
    "CartridgeMovement",
    (cartridgeMovement: CartridgeMovement) => cartridgeMovement.movement,
  )
  declare action: CartridgeMovement[];

  @ManyToOne("User", (user: User) => user.id)
  declare whoAccepted: User;

  @ManyToOne("Warehouse", (warehouse: Warehouse) => warehouse.movementOut)
  declare warehouseFrom: Warehouse;

  @ManyToOne("Warehouse", (warehouse: Warehouse) => warehouse.movementIn)
  declare warehouseWhere: Warehouse;
}
