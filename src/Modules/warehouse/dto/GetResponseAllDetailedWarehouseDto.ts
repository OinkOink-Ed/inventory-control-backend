import { ApiProperty } from '@nestjs/swagger';

//Переименование со связями - не знаю как связать с сущностями
export class GetResponseAllDetailedWarehouseDto {
  @ApiProperty()
  divisionId: number;

  @ApiProperty()
  kabinetId: number;

  @ApiProperty()
  number: string;
}
