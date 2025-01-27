import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user';
import { Cartridges } from 'src/common/entities/cartridges';

@Entity()
export class CartridgeModels {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  modelName: string;

  @Column()
  printerName: string;

  @OneToMany(() => Cartridges, (Cartridges) => Cartridges.id)
  cartridges: Relation<Cartridges>[]

  @ManyToOne(() => User, (user) => user.addedModels, { cascade: ['insert'] })
  creator: Relation<User>;
  @ManyToOne(() => User, (user) => user.updatedModels, { cascade: ['update'] })
  updater: Relation<User>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
