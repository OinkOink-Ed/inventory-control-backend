import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user';

@Entity()
export class CartridgeModels {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  modelName: string;

  @Column()
  printerName: string;

  @ManyToOne(() => User, (user) => user.addedModels, { cascade: ['insert'] })
  creator: Relation<User>;
  @ManyToOne(() => User, (user) => user.updatedModels, { cascade: ['update'] })
  updater: Relation<User>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
