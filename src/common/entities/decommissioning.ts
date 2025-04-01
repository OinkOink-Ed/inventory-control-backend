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
