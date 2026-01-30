import { Base } from '@common/entities/Base';
import type { Cartridge } from '@Modules/cartridge/entities/Cartridge';
import type { Decommissioning } from '@Modules/decommissioning/entities/Decommissioning';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

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
