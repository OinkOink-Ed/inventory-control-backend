import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CartridgeDecommissioning {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  //Это связь - отношение

  @Column()
  decommissioningId: number;

  @Column()
  cartridgeId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
