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
    type: () => ({
      id: Number,
      name: String,
    }),
  })
  warehouse: { id: number; name: string };

  @ApiProperty({
    type: () => ({
      id: Number,
      name: String,
    }),
  })
  model: { id: number; name: string };

  @ApiProperty()
  createdAt: Date;
}
