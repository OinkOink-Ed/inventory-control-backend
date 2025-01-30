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
import { Role } from './role';
import { CartridgeModels } from './cartridgeModels';
import { Movements } from './movements';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickname: string;

  @Column()
  password: string;

  @Column({
    nullable: false,
  })
  surname: string;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  patronimyc: string;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @OneToMany(
    () => CartridgeModels,
    (cartridgemodels) => cartridgemodels.creator,
  )
  addedModels: Relation<CartridgeModels>[];

  @OneToMany(() => Movements, (movements) => movements)
  movements_id: Relation<Movements>[];

  @OneToMany(
    () => CartridgeModels,
    (cartridgemodels) => cartridgemodels.updater,
  )
  updatedModels: Relation<CartridgeModels>[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
