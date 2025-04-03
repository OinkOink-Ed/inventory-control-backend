import {
  Column,
  //   Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Receieving {
  @PrimaryGeneratedColumn()
  id: number;

  // там где ID добавить связи

  @Column()
  userId: number;

  @Column()
  warehouseId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
