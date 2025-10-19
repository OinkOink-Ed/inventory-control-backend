import { ApiProperty } from '@nestjs/swagger';

export class ReceivingCartridgeEventType {
  @ApiProperty()
  warehouseId: number;
}
