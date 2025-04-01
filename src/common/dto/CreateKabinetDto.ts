import { ApiProperty } from '@nestjs/swagger';

export class CreateKabinetDto {
  @ApiProperty()
  number: number;

  @ApiProperty()
  divisionID: number;
}
