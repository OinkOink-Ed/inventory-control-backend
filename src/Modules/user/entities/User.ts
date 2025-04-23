import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { UserStatus } from '../../../common/enums/UserStatus';
import type { Role } from '../../role/entities/Role';
import type { Division } from 'src/Modules/division/entities/Division';
import type { Warehouse } from 'src/Modules/warehouse/entities/Warehouse';
import type { Kabinet } from 'src/Modules/kabinet/entities/Kabinet';
import type { CartridgeModel } from 'src/Modules/cartridgeModel/entities/CartridgeModel';
import type { Cartridge } from 'src/Modules/cartridge/entities/Cartridge';
import type { Movement } from '../../movement/entities/Movement';
import type { Receiving } from '../../receiving/entities/Receiving';
import type { Decommissioning } from '../../decommissioning/entities/Decommissioning';
import type { Delivery } from '../../delivery/entities/Delivery';
import { Base } from 'src/common/entities/Base';

@Entity()
export class User extends Base {
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

  @ManyToOne('Division', (division: Division) => division.users)
  division: Division;

  @ManyToOne('Role', (role: Role) => role.users)
  role: Role;

  @ManyToOne('User', (user: User) => user.createdUsers, {
    nullable: true,
  })
  creator: User;

  @OneToMany('User', (user: User) => user.creator, { nullable: true })
  createdUsers: User[];

  @OneToMany('Role', (role: Role) => role.creator, { nullable: true })
  createdRoles: Role[];

  @OneToMany('Warehouse', (warehouse: Warehouse) => warehouse.creator)
  createdWarehouses: Warehouse[];

  @OneToMany('Division', (division: Division) => division.creator)
  createdDivisions: Division[];

  @OneToMany('Kabinet', (kabinet: Kabinet) => kabinet.creator)
  createdKabinets: Kabinet[];

  @OneToMany(
    'CartridgeModel',
    (cartridgeModel: CartridgeModel) => cartridgeModel.creator,
  )
  createdCartridgeModels: CartridgeModel[];

  @OneToMany('Cartridge', (cartridge: Cartridge) => cartridge.creator)
  createdCartridges: Cartridge[];

  @OneToMany('Movement', (movement: Movement) => movement.creator)
  createdMovement: Movement[];

  @OneToMany('Receiving', (receiving: Receiving) => receiving.creator)
  createdReceiving: Receiving[];

  @OneToMany(
    'Decommissioning',
    (decommissioning: Decommissioning) => decommissioning.creator,
  )
  createdDecommissioning: Decommissioning[];

  @OneToMany('Delivery', (delivery: Delivery) => delivery.creator)
  createdDelivery: Delivery[];
}
