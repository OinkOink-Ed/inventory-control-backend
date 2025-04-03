import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Movement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  //Добавить связи где ID

  @Column()
  warehouseFromId: number;

  @Column()
  warehouseWhereId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
