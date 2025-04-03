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
  number: string;

  //Нужно сделать связь где ID

  @Column()
  divisionId: number;

  @Column()
  creatorId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
