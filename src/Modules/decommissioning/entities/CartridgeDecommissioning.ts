import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import type { Cartridge } from '../../cartridge/entities/Cartridge';
import type { Decommissioning } from './Decommissioning';
import { Base } from 'src/common/entities/Base';

@Entity()
export class CartridgeDecommissioning extends Base {
  @Column()
  comment: string;

  @ManyToOne(
    'Decommissioning',
    (decommissioning: Decommissioning) => decommissioning.action,
  )
  decommissioning: Decommissioning;

  @OneToOne(
    'Cartridge',
    (cartridge: Cartridge) => cartridge.actionDecommissioning,
  )
  @JoinColumn()
  cartridge: Cartridge;
}
