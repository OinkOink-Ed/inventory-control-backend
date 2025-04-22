import { ApiProperty } from '@nestjs/swagger';
import { CartridgeStatus } from 'src/common/enums/CartridgeStatus';

export class GetResponseAllCartridgeInWarehouseDto {
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
  })
  warehouse: { id: number; name: string };

  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
    },
  })
  model: { id: number; name: string };

  @ApiProperty()
  createdAt: Date;
}
