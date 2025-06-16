import { CartridgeStatus } from '@common/enums/CartridgeStatus';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

class Warehouse {
  @Expose()
  id: number;

  @Expose()
  name: string;
}

class Model {
  @Expose()
  id: number;

  @Expose()
  name: string;
}

export class GetResponseAllCartridgeInWarehouseDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty({
    enum: CartridgeStatus,
    enumName: 'CartridgeStatus',
  })
  state: CartridgeStatus;

  @Expose()
  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
    },
    required: ['id', 'name'],
  })
  @Type(() => Warehouse)
  warehouse: Warehouse;

  @Expose()
  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
    },
    required: ['id', 'name'],
  })
  @Type(() => Model)
  model: Model;

  @Expose()
  @ApiProperty({ type: 'string' })
  createdAt: Date;
}
