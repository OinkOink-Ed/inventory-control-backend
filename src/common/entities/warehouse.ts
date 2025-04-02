import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Warehouse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  openning: Date;

  @Column()
  divisionId: number;

  //Добавить отношения
  @Column()
  statusId: number;

  @Column()
  closure: Date;

  @Column()
  cartridgeId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
