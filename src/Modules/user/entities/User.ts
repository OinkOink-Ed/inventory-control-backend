import { Base } from '@common/entities/Base';
import { UserStatus } from '@common/enums/UserStatus';
import type { Cartridge } from '@Modules/cartridge/entities/Cartridge';
import type { CartridgeModel } from '@Modules/cartridgeModel/entities/CartridgeModel';
import type { Decommissioning } from '@Modules/decommissioning/entities/Decommissioning';
import type { Delivery } from '@Modules/delivery/entities/Delivery';
import type { Division } from '@Modules/division/entities/Division';
import type { Kabinet } from '@Modules/kabinet/entities/Kabinet';
import type { Movement } from '@Modules/movement/entities/Movement';
import type { Receiving } from '@Modules/receiving/entities/Receiving';
import type { Role } from '@Modules/role/entities/Role';
import type { Warehouse } from '@Modules/warehouse/entities/Warehouse';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

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

  @ManyToOne('Division', (division: Division) => division.users, {
    nullable: true,
  })
  division: Division;

  @ManyToOne('Role', (role: Role) => role.users)
  role: Role;

  @ManyToOne('User', (user: User) => user.createdUsers, {
    nullable: true,
  })
  creator: User;

  @OneToMany('User', (user: User) => user.creator)
  createdUsers: User[];

  @OneToMany('Role', (role: Role) => role.creator)
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
