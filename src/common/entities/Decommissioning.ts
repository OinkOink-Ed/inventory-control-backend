import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import type { CartridgeDecommissioning } from './CartridgeDecommissioning';
import type { User } from './User';
import type { Warehouse } from './Warehouse';
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

  @ManyToOne('User', (user: User) => user.createdDecommissioning, {
    cascade: ['insert'],
  })
  creator: User;

  @ManyToOne('Warehouse', (warehouse: Warehouse) => warehouse.decommissioning)
  warehouse: Warehouse;
}
