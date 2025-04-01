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
  openning: Date;

  //   @Column()
  //   divisionId

  //   @Column()
  //   statusID

  @Column()
  closure: Date;

  //   @Column()
  //   cartridgeID

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
