import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Decommissioning {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  //Добавить связи где ID

  @Column()
  userId: number;

  @Column()
  warehouseId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
