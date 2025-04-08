import { Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import type { Cartridge } from '../../cartridge/entities/Cartridge';
import type { Movement } from './Movement';
import { Base } from 'src/common/entities/Base';

@Entity()
export class CartridgeMovement extends Base {
  @OneToOne('Cartridge', (cartridge: Cartridge) => cartridge.actionMovement)
  @JoinColumn()
  cartridge: Cartridge;

  @ManyToOne('Movement', (movement: Movement) => movement.action)
  movement: Movement;
}
