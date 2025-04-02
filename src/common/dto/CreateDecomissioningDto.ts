import { ApiProperty } from '@nestjs/swagger';

export class CreateDecomissioningDto {
  @ApiProperty()
  comment: string;

  @ApiProperty()
  wareHouseID: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  cartridgeId: number;
}
