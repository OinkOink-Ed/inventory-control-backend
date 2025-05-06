import { CartridgeStatus } from '@common/enums/CartridgeStatus';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

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
  warehouse: { id: number; name: string };

  @Expose()
  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
    },
    required: ['id', 'name'],
  })
  model: { id: number; name: string };

  @Expose()
  @ApiProperty()
  createdAt: string;
}
