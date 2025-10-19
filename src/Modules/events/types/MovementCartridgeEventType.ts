import { ApiProperty } from '@nestjs/swagger';

export class MovementCartridgeEventType {
  @ApiProperty()
  oldDivisionId: number;
  @ApiProperty()
  newDivisionId: number;
}
