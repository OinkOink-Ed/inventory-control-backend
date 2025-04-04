import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserStatus } from '../types/UserStatus';
import { Division } from './Division';
import { Warehouse } from './Warehouse';
import { Kabinet } from './Kabinet';
import { CartridgeModel } from './CartridgeModel';
import { Cartridge } from './Cartridge';
import { Role } from './Role';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  patronimyc: string;

  @Column()
  telephone: string;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  state: UserStatus;

  // @ManyToOne(() => Division, (division) => division.users)
  // division: Division;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  // @ManyToOne(() => User, (user) => user.createdUsers, { nullable: true })
  // creator: User;

  // @OneToMany(() => User, (user) => user.creator, { nullable: true })
  // createdUsers: User[];

  // @OneToMany(() => Role, (role) => role.creator, { nullable: true })
  // createdRoles: Role[];

  // @OneToMany(() => Warehouse, (warehouse) => warehouse.creator, {
  //   nullable: true,
  // })
  // createdWarehouses: Warehouse[];

  // @OneToMany(() => Division, (division) => division.creator, {
  //   nullable: true,
  // })
  // createdDivisions: Division[];

  // @OneToMany(() => Kabinet, (kabinet) => kabinet.creator, { nullable: true })
  // createdKabinets: Kabinet[];

  // @OneToMany(() => CartridgeModel, (cartridgeModel) => cartridgeModel.creator, {
  //   nullable: true,
  // })
  // createdCartridgeModels: CartridgeModel[];

  // @OneToMany(() => Cartridge, (cartridge) => cartridge.creator, {
  //   nullable: true,
  // })
  // createdCartridges: Cartridge[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
