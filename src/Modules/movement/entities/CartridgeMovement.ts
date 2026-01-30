import { Base } from '@common/entities/Base';
import type { Cartridge } from '@Modules/cartridge/entities/Cartridge';
import type { Movement } from '@Modules/movement/entities/Movement';
import { Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity()
export class CartridgeMovement extends Base {
  @OneToOne('Cartridge', (cartridge: Cartridge) => cartridge.actionMovement)
  @JoinColumn()
  cartridge: Cartridge;

  @ManyToOne('Movement', (movement: Movement) => movement.action)
  movement: Movement;
}
