import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  // OneToMany,
  PrimaryGeneratedColumn,
  // Relation,
  UpdateDateColumn,
} from 'typeorm';
import { UserStatus } from '../types/UserStatus';
// import { Division } from './Division';
// import { Warehouse } from './Warehouse';
// import { Kabinet } from './Kabinet';
// import { CartridgeModel } from './CartridgeModel';
// import { Cartridge } from './Cartridge';
import type { Role } from './Role';
import type { Division } from 'src/common/entities/Division';
import type { Warehouse } from 'src/common/entities/Warehouse';
import type { Kabinet } from 'src/common/entities/Kabinet';
import type { CartridgeModel } from 'src/common/entities/CartridgeModel';
import type { Cartridge } from 'src/common/entities/Cartridge';

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

  @ManyToOne('Division', (division: Division) => division.users, {
    cascade: ['insert', 'update'],
  })
  division: Division;

  @ManyToOne('Role', (role: Role) => role.users, { cascade: ['insert'] })
  role: Role;

  @ManyToOne('User', (user: User) => user.createdUsers, {
    nullable: true,
    cascade: ['insert'],
  })
  creator: User;

  @OneToMany('User', (user: User) => user.creator, { nullable: true })
  createdUsers: User[];

  @OneToMany('Role', (role: Role) => role.creator, { nullable: true })
  createdRoles: Role[];

  @OneToMany('Warehouse', (warehouse: Warehouse) => warehouse.creator, {
    nullable: true,
  })
  createdWarehouses: Warehouse[];

  @OneToMany('Division', (division: Division) => division.creator, {
    nullable: true,
  })
  createdDivisions: Division[];

  @OneToMany('Kabinet', (kabinet: Kabinet) => kabinet.creator, {
    nullable: true,
  })
  createdKabinets: Kabinet[];

  @OneToMany(
    'CartridgeModel',
    (cartridgeModel: CartridgeModel) => cartridgeModel.creator,
    {
      nullable: true,
    },
  )
  createdCartridgeModels: CartridgeModel[];

  @OneToMany('Cartridge', (cartridge: Cartridge) => cartridge.creator, {
    nullable: true,
  })
  createdCartridges: Cartridge[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
