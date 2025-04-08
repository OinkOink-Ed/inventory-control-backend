import { Column, Entity, ManyToOne } from 'typeorm';
import type { User } from '../../user/entities/User';
import { Base } from 'src/common/entities/Base';

@Entity()
export class CartridgeModel extends Base {
  @Column()
  name: string;

  @ManyToOne('User', (user: User) => user.createdCartridgeModels, {
    cascade: ['insert'],
  })
  creator: User;
}
