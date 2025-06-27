import { CartridgeStatus } from '@common/enums/CartridgeStatus';
import { ApiProperty } from '@nestjs/swagger';
import type { Cartridge } from '../entities/Cartridge';
import type { Warehouse } from '@Modules/warehouse/entities/Warehouse';
import type { CartridgeModel } from '@Modules/cartridgeModel/entities/CartridgeModel';
import { AssertTManyProperty } from '@common/utils/typesUtils';

type Assert = AssertTManyProperty<
  Cartridge,
  {
    warehouse: Pick<Warehouse, 'id' | 'name'>;
    model: Pick<CartridgeModel, 'id' | 'name'>;
  }
>;

type StrictCartridgeModelType = Pick<CartridgeModel, 'id' | 'name'>;
type StrictWarehouseType = Pick<Warehouse, 'id' | 'name'>;

type CartridgeModelType = { model: StrictCartridgeModelType };
type WarehouseType = { warehouse: StrictWarehouseType };

export class GetResponseAllCartridgeInWarehouseDto
  implements
    Pick<Assert & Cartridge, 'id' | 'state' | 'createdAt'>,
    CartridgeModelType,
    WarehouseType
{
  @ApiProperty()
  id: number;

  @ApiProperty({
    enum: CartridgeStatus,
    enumName: 'CartridgeStatus',
  })
  state: CartridgeStatus;

  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
    },
    required: ['id', 'name'],
  })
  warehouse: StrictWarehouseType;

  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
    },
    required: ['id', 'name'],
  })
  model: StrictCartridgeModelType;

  @ApiProperty({ type: 'string' })
  createdAt: Date;
}
