import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Delivery {
  @PrimaryGeneratedColumn()
  id: number;

  // Где ID  добавить связи

  @Column()
  creatorId: number;

  @Column()
  kabinetId: number;

  @Column()
  divisionId: number;

  @Column()
  warehouseId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
