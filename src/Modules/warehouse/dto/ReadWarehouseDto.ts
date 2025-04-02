import { ApiProperty } from '@nestjs/swagger';

export class ReadWarehouseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  openning: Date;

  //Расширить для получения через связь
  @ApiProperty()
  statusId: number;
}

export class ReadWarehouseDetailedDto extends ReadWarehouseDto {
  //Расширить для получения через связь
  @ApiProperty()
  divisionId: number;

  //Расширить для получения через связь
  @ApiProperty()
  cartridgeId: number;
}
