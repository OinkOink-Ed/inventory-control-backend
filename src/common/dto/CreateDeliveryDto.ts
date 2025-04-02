import { ApiProperty } from '@nestjs/swagger';

export class CreateDeliveryDto {
  @ApiProperty()
  wareHouseID: number;

  @ApiProperty()
  kabinetID: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  cartridgeId: number;

  @ApiProperty()
  divisionId: number;
}
