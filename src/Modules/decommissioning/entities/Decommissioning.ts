import { Base } from '@common/entities/Base';
import type { CartridgeDecommissioning } from '@Modules/decommissioning/entities/CartridgeDecommissioning';
import type { User } from '@Modules/user/entities/User';
import type { Warehouse } from '@Modules/warehouse/entities/Warehouse';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

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
