import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Kabinet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: number;

  //Нужно сделать связь
  @Column()
  divisionId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
