import { ApiProperty } from '@nestjs/swagger';

export class DeliveryCartridgeEventType {
  @ApiProperty()
  userId: number;
  @ApiProperty()
  divisionId: number;
}
