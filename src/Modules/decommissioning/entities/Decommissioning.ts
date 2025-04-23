import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import type { CartridgeDecommissioning } from './CartridgeDecommissioning';
import type { User } from '../../user/entities/User';
import type { Warehouse } from '../../warehouse/entities/Warehouse';
import { Base } from 'src/common/entities/Base';

@Entity()
export class Decommissioning extends Base {
  @Column()
  comment: string;

  @OneToMany(
    'CartridgeDecommissioning',
    (cartridgeDecommissioning: CartridgeDecommissioning) =>
      cartridgeDecommissioning.decommissioning,
  )
  action: CartridgeDecommissioning[];

  @ManyToOne('User', (user: User) => user.createdDecommissioning)
  creator: User;

  @ManyToOne('Warehouse', (warehouse: Warehouse) => warehouse.decommissioning)
  warehouse: Warehouse;
}
