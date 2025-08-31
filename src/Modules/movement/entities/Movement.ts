import { Base } from '@common/entities/Base';
import type { CartridgeMovement } from '@Modules/movement/entities/CartridgeMovement';
import type { User } from '@Modules/user/entities/User';
import type { Warehouse } from '@Modules/warehouse/entities/Warehouse';
import { Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Movement extends Base {
  @ManyToOne('User', (user: User) => user.createdMovement)
  creator: User;

  @OneToMany(
    'CartridgeMovement',
    (cartridgeMovement: CartridgeMovement) => cartridgeMovement.movement,
  )
  action: CartridgeMovement[];

  @ManyToOne('User', (user: User) => user.id)
  whoAccepted: User;

  @ManyToOne('Warehouse', (warehouse: Warehouse) => warehouse.movementOut)
  warehouseFrom: Warehouse;

  @ManyToOne('Warehouse', (warehouse: Warehouse) => warehouse.movementIn)
  warehouseWhere: Warehouse;
}
