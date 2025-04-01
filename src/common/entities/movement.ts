import {
  //   Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Movement {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column()
  // userID

  // @Column()
  // cartridgeID

  // @Column()
  // warehouseFromID

  // @Column()
  // warehouseWhereID

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
