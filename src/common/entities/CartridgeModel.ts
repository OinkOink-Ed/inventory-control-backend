import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CartridgeModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  //Это связь - отношение
  @Column()
  creatorid: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
