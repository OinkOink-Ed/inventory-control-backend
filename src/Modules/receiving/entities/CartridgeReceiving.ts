import { Base } from '@common/entities/Base';
import type { Cartridge } from '@Modules/cartridge/entities/Cartridge';
import type { Receiving } from '@Modules/receiving/entities/Receiving';
import { Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity()
export class CartridgeReceiving extends Base {
  @OneToOne('Cartridge', (cartridge: Cartridge) => cartridge.actionReceiving)
  @JoinColumn()
  cartridge: Cartridge;

  @ManyToOne('Receiving', (receiving: Receiving) => receiving.action)
  receiving: Receiving;
}
