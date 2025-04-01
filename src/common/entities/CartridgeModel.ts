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

  //   @Column()
  //   creatorID

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
