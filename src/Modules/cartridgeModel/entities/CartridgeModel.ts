import { Base } from 'common/entities/Base';
import type { Cartridge } from 'Modules/cartridge/entities/Cartridge';
import type { User } from 'Modules/user/entities/User';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class CartridgeModel extends Base {
  @Column()
  name: string;

  @ManyToOne('User', (user: User) => user.createdCartridgeModels)
  creator: User;

  @OneToMany('Cartridge', (cartrdge: Cartridge) => cartrdge.model)
  cartridges: Cartridge[];
}
