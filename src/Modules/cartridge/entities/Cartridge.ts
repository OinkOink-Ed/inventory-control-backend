import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { CartridgeStatus } from '../../../common/enums/CartridgeStatus';
import type { Warehouse } from '../../warehouse/entities/Warehouse';
import type { User } from '../../user/entities/User';
import type { CartridgeMovement } from '../../movement/entities/CartridgeMovement';
import type { CartridgeReceiving } from '../../receiving/entities/CartridgeReceiving';
import type { CartridgeDecommissioning } from '../../decommissioning/entities/CartridgeDecommissioning';
import type { CartridgeDelivery } from '../../delivery/entities/CartridgeDelivery';
import { Base } from 'src/common/entities/Base';

@Entity()
export class Cartridge extends Base {
  @Column({
    type: 'enum',
    enum: CartridgeStatus,
    default: CartridgeStatus.RECEIVED,
  })
  state: CartridgeStatus;

  @Column()
  model: number;

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

  @ManyToOne('Warehouse', (warehouse: Warehouse) => warehouse.cartridges, {
    cascade: ['insert'],
  })
  warehouse: Warehouse;

  @ManyToOne('User', (user: User) => user.createdCartridges, {
    cascade: ['insert'],
  })
  creator: User;
}
