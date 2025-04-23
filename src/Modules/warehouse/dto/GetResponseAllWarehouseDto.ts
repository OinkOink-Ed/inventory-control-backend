import { ApiProperty } from '@nestjs/swagger';

export class GetResponseAllWarehouseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
