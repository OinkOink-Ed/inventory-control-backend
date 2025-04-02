import { ApiProperty } from '@nestjs/swagger';

export class CreateMovementDto {
  @ApiProperty()
  wareHouseFromID: number;

  @ApiProperty()
  wareHouseWhereID: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  cartridgeId: number;
}
