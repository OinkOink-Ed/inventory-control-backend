import { ApiProperty } from '@nestjs/swagger';

export class ReadKabinetDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  number: number;

  @ApiProperty()
  divisionId: number;
}
