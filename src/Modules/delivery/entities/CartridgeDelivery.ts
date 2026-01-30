import { Base } from '@common/entities/Base';
import type { Cartridge } from '@Modules/cartridge/entities/Cartridge';
import type { Delivery } from '@Modules/delivery/entities/Delivery';
import { Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity()
export class CartridgeDelivery extends Base {
  @ManyToOne('Delivery', (delivery: Delivery) => delivery.action)
  delivery: Delivery;

  @OneToOne('Cartridge', (cartridge: Cartridge) => cartridge.actionDelivery)
  @JoinColumn({ name: 'cartridge' })
  cartridge: Cartridge;
}
