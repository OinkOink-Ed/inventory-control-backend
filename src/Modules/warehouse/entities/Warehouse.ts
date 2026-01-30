import { Base } from '@common/entities/Base';
import { WarehouseStatus } from '@common/enums/WarehouseStatus';
import type { Cartridge } from '@Modules/cartridge/entities/Cartridge';
import type { Decommissioning } from '@Modules/decommissioning/entities/Decommissioning';
import type { Delivery } from '@Modules/delivery/entities/Delivery';
import type { Division } from '@Modules/division/entities/Division';
import type { Movement } from '@Modules/movement/entities/Movement';
import type { Receiving } from '@Modules/receiving/entities/Receiving';
import type { User } from '@Modules/user/entities/User';
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';

@Entity()
export class Warehouse extends Base {
  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: WarehouseStatus,
    default: WarehouseStatus.ISOPEN,
  })
  state: WarehouseStatus;

  @OneToOne('Division', (division: Division) => division.warehouse)
  division: Division;

  @ManyToOne('User', (user: User) => user.createdWarehouses)
  creator: User;

  @OneToMany('Cartridge', (cartridge: Cartridge) => cartridge.warehouse)
  cartridges: Cartridge[];

  @OneToMany('Movement', (movement: Movement) => movement.warehouseFrom)
  movementOut: Movement[];

  @OneToMany('Movement', (movement: Movement) => movement.warehouseWhere)
  movementIn: Movement[];

  @OneToMany('Receiving', (receiving: Receiving) => receiving.warehouse)
  receiving: Receiving[];

  @OneToMany(
    'Decommissioning',
    (decommissioning: Decommissioning) => decommissioning.warehouse,
  )
  decommissioning: Decommissioning[];

  @OneToMany('Delivery', (delivery: Delivery) => delivery.warehouse)
  delivery: Delivery[];
}
