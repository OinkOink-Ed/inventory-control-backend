import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CartridgeDelivery {
  @PrimaryGeneratedColumn()
  id: number;

  //Это связь - отношение

  @Column()
  movementId: number;

  @Column()
  cartridgeId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
