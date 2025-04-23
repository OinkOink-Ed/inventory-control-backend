import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import type { User } from '../../user/entities/User';
import { Base } from 'src/common/entities/Base';
import type { Cartridge } from 'src/Modules/cartridge/entities/Cartridge';

@Entity()
export class CartridgeModel extends Base {
  @Column()
  name: string;

  @ManyToOne('User', (user: User) => user.createdCartridgeModels)
  creator: User;

  @OneToMany('Cartridge', (cartrdge: Cartridge) => cartrdge.model)
  cartridges: Cartridge[];
}
