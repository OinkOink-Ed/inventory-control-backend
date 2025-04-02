import { ApiProperty } from '@nestjs/swagger';

export class CreateWarehouseDto {
  @ApiProperty()
  openning: Date;

  @ApiProperty()
  divisionId: number;

  @ApiProperty()
  statusId: number;
}
