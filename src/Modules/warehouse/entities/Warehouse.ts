import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { WarehouseStatus } from '../../../common/enums/WarehouseStatus';
import type { Division } from '../../division/entities/Division';
import type { User } from '../../user/entities/User';
import type { Cartridge } from '../../cartridge/entities/Cartridge';
import type { Movement } from '../../movement/entities/Movement';
import type { Receiving } from '../../receiving/entities/Receiving';
import type { Decommissioning } from '../../decommissioning/entities/Decommissioning';
import type { Delivery } from '../../delivery/entities/Delivery';
import { Base } from 'src/common/entities/Base';

@Entity()
export class Warehouse extends Base {
  @Column()
  name: string;

  @Column()
  openningDate: Date;

  @Column()
  closingDate: Date;

  @Column({
    type: 'enum',
    enum: WarehouseStatus,
    default: WarehouseStatus.ISOPEN,
  })
  state: WarehouseStatus;

  @OneToOne('Division', (division: Division) => division.warehouse)
  division: Division;

  @ManyToOne('User', (user: User) => user.createdWarehouses, {
    cascade: ['insert'],
  })
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
