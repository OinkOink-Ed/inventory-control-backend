import { ApiProperty } from '@nestjs/swagger';

export class GetResponseAllKabinetDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  number: string;
}
