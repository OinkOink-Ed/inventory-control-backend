import { Base } from "@common/entities/Base";
import { CartridgeStatus } from "@common/enums/CartridgeStatus";
import type { CartridgeModel } from "@Modules/cartridgeModel/entities/CartridgeModel";
import type { CartridgeDecommissioning } from "@Modules/decommissioning/entities/CartridgeDecommissioning";
import type { CartridgeDelivery } from "@Modules/delivery/entities/CartridgeDelivery";
import type { CartridgeMovement } from "@Modules/movement/entities/CartridgeMovement";
import type { CartridgeReceiving } from "@Modules/receiving/entities/CartridgeReceiving";
import type { User } from "@Modules/user/entities/User";
import type { Warehouse } from "@Modules/warehouse/entities/Warehouse";
import { Column, Entity, ManyToOne, OneToOne } from "typeorm";

@Entity()
export class Cartridge extends Base {
  @Column({
    type: "enum",
    enum: CartridgeStatus,
  })
  declare state: CartridgeStatus;

  @ManyToOne(
    "CartridgeModel",
    (cartrdgeModel: CartridgeModel) => cartrdgeModel.cartridges,
  )
  declare model: CartridgeModel;

  @OneToOne(
    "CartridgeMovement",
    (cartridgeMovement: CartridgeMovement) => cartridgeMovement.cartridge,
  )
  declare actionMovement: CartridgeMovement;

  @OneToOne(
    "CartridgeReceiving",
    (cartridgeReceiving: CartridgeReceiving) => cartridgeReceiving.cartridge,
  )
  declare actionReceiving: CartridgeReceiving;

  @OneToOne(
    "CartridgeDecommissioning",
    (cartridgeDecommissioning: CartridgeDecommissioning) =>
      cartridgeDecommissioning.cartridge,
  )
  declare actionDecommissioning: CartridgeDecommissioning;

  @OneToOne(
    "CartridgeDelivery",
    (cartridgeDelivery: CartridgeDelivery) => cartridgeDelivery.cartridge,
  )
  declare actionDelivery: CartridgeDelivery;

  @ManyToOne("Warehouse", (warehouse: Warehouse) => warehouse.cartridges)
  declare warehouse: Warehouse;

  @ManyToOne("User", (user: User) => user.createdCartridges)
  declare creator: User;
}
