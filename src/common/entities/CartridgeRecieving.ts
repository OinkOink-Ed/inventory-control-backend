import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CartridgeRecieving {
  @PrimaryGeneratedColumn()
  id: number;

  //Это связь - отношение

  @Column()
  recievingId: number;

  @Column()
  cartridgeId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
