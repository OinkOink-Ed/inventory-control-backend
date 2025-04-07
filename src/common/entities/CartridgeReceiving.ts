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
import type { Receiving } from './Receiving';

@Entity()
export class CartridgeReceiving {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne('Cartridge', (cartridge: Cartridge) => cartridge.actionReceiving)
  @JoinColumn()
  cartridge: Cartridge;

  @ManyToOne('Receiving', (receiving: Receiving) => receiving.action)
  receiving: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
