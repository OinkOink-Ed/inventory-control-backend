import { Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import type { Cartridge } from '../../cartridge/entities/Cartridge';
import type { Receiving } from './Receiving';
import { Base } from 'src/common/entities/Base';

@Entity()
export class CartridgeReceiving extends Base {
  @OneToOne('Cartridge', (cartridge: Cartridge) => cartridge.actionReceiving)
  @JoinColumn()
  cartridge: Cartridge;

  @ManyToOne('Receiving', (receiving: Receiving) => receiving.action)
  receiving: Receiving;
}
