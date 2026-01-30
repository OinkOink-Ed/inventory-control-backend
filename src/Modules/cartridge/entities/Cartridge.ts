import { Base } from '@common/entities/Base';
import { CartridgeStatus } from '@common/enums/CartridgeStatus';
import type { CartridgeModel } from '@Modules/cartridgeModel/entities/CartridgeModel';
import type { CartridgeDecommissioning } from '@Modules/decommissioning/entities/CartridgeDecommissioning';
import type { CartridgeDelivery } from '@Modules/delivery/entities/CartridgeDelivery';
import type { CartridgeMovement } from '@Modules/movement/entities/CartridgeMovement';
import type { CartridgeReceiving } from '@Modules/receiving/entities/CartridgeReceiving';
import type { User } from '@Modules/user/entities/User';
import type { Warehouse } from '@Modules/warehouse/entities/Warehouse';
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';

@Entity()
export class Cartridge extends Base {
  @Column({
    type: 'enum',
    enum: CartridgeStatus,
  })
  state: CartridgeStatus;

  @ManyToOne(
    'CartridgeModel',
    (cartrdgeModel: CartridgeModel) => cartrdgeModel.cartridges,
  )
  model: CartridgeModel;

  @OneToOne(
    'CartridgeMovement',
    (cartridgeMovement: CartridgeMovement) => cartridgeMovement.cartridge,
  )
  actionMovement: CartridgeMovement;

  @OneToOne(
    'CartridgeReceiving',
    (cartridgeReceiving: CartridgeReceiving) => cartridgeReceiving.cartridge,
  )
  actionReceiving: CartridgeReceiving;

  @OneToOne(
    'CartridgeDecommissioning',
    (cartridgeDecommissioning: CartridgeDecommissioning) =>
      cartridgeDecommissioning.cartridge,
  )
  actionDecommissioning: CartridgeDecommissioning;

  @OneToOne(
    'CartridgeDelivery',
    (cartridgeDelivery: CartridgeDelivery) => cartridgeDelivery.cartridge,
  )
  actionDelivery: CartridgeDelivery;

  @ManyToOne('Warehouse', (warehouse: Warehouse) => warehouse.cartridges)
  warehouse: Warehouse;

  @ManyToOne('User', (user: User) => user.createdCartridges)
  creator: User;
}
