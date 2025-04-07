import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { Cartridge } from './Cartridge';
import type { Movement } from './Movement';

@Entity()
export class CartridgeMovement {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne('Cartridge', (cartridge: Cartridge) => cartridge.actionMovement)
  @JoinColumn()
  cartridge: Cartridge;

  @ManyToOne('Movement', (movement: Movement) => movement.action)
  movement: Movement;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
