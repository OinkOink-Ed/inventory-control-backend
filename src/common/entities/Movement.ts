import { Entity, ManyToOne, OneToMany } from 'typeorm';
import type { CartridgeMovement } from './CartridgeMovement';
import type { Warehouse } from './Warehouse';
import type { User } from './User';
import { Base } from 'src/common/entities/Base';

@Entity()
export class Movement extends Base {
  @ManyToOne('User', (user: User) => user.createdMovement, {
    cascade: ['insert'],
  })
  creator: User;

  @OneToMany(
    'CartridgeMovement',
    (cartridgeMovement: CartridgeMovement) => cartridgeMovement.movement,
  )
  action: CartridgeMovement[];

  @ManyToOne('Warehouse', (warehouse: Warehouse) => warehouse.movementOut)
  warehouseFrom: Warehouse;

  @ManyToOne('Warehouse', (warehouse: Warehouse) => warehouse.movementIn)
  warehouseWhere: Warehouse;
}
