import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { CartridgeStatus } from '../../../common/enums/CartridgeStatus';
import type { Warehouse } from '../../warehouse/entities/Warehouse';
import type { User } from '../../user/entities/User';
import type { CartridgeMovement } from '../../movement/entities/CartridgeMovement';
import type { CartridgeReceiving } from '../../receiving/entities/CartridgeReceiving';
import type { CartridgeDecommissioning } from '../../decommissioning/entities/CartridgeDecommissioning';
import type { CartridgeDelivery } from '../../delivery/entities/CartridgeDelivery';
import { Base } from 'src/common/entities/Base';
import type { CartridgeModel } from 'src/Modules/cartridgeModel/entities/CartridgeModel';

@Entity()
export class Cartridge extends Base {
  @Column({
    type: 'enum',
    enum: CartridgeStatus,
    default: CartridgeStatus.RECEIVED,
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
