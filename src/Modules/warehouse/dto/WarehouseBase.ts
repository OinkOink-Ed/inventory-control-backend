import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { WarehouseStatus } from 'src/common/enums/WarehouseStatus';

export class WarehouseBase {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  openningDate: Date;

  @ApiProperty()
  closingDate: Date;

  @ApiProperty({
    enum: WarehouseStatus,
    enumName: 'WarehouseStatus',
  })
  @IsEnum(WarehouseStatus)
  state: WarehouseStatus;

  //   @OneToOne('Division', (division: Division) => division.warehouse, {
  //     nullable: true,
  //   })
  //   division: Division;

  //   @ManyToOne('User', (user: User) => user.createdWarehouses, {
  //     cascade: ['insert'],
  //   })
  //   creator: User;

  //   @OneToMany('Cartridge', (cartridge: Cartridge) => cartridge.warehouse)
  //   cartridges: Cartridge[];

  //   @OneToMany('Movement', (movement: Movement) => movement.warehouseFrom)
  //   movementOut: Movement[];

  //   @OneToMany('Movement', (movement: Movement) => movement.warehouseWhere)
  //   movementIn: Movement[];

  //   @OneToMany('Receiving', (receiving: Receiving) => receiving.warehouse)
  //   receiving: Receiving[];

  //   @OneToMany(
  //     'Decommissioning',
  //     (decommissioning: Decommissioning) => decommissioning.warehouse,
  //   )
  //   decommissioning: Decommissioning[];

  //   @OneToMany('Delivery', (delivery: Delivery) => delivery.warehouse)
  //   delivery: Delivery[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
