import {
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

  // @Column()
  // userID

  // @Column()
  // cartridgeID

  // @Column()
  // warehouseID

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
