import type { User } from "@Modules/user/entities/User";
import type { Cartridge } from "@Modules/cartridge/entities/Cartridge";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Base } from "@common/entities/Base";

@Entity()
export class CartridgeModel extends Base {
  @Column()
  declare name: string;

  @ManyToOne("User", (user: User) => user.createdCartridgeModels)
  declare creator: User;

  @OneToMany("Cartridge", (cartrdge: Cartridge) => cartrdge.model)
  declare cartridges: Cartridge[];
}
