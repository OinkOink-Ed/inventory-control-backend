import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { Cartridge } from './Cartridge';
import type { Decommissioning } from './Decommissioning';

@Entity()
export class CartridgeDecommissioning {
  @PrimaryGeneratedColumn()
  id: number;

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
