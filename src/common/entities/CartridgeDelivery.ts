import { Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import type { Cartridge } from './Cartridge';
import type { Delivery } from './Delivery';
import { Base } from 'src/common/entities/Base';

@Entity()
export class CartridgeDelivery extends Base {
  @ManyToOne('Delivery', (delivery: Delivery) => delivery.action)
  delivery: Delivery;

  @OneToOne('Cartridge', (cartridge: Cartridge) => cartridge.actionDelivery)
  @JoinColumn()
  cartridge: Cartridge;
}
