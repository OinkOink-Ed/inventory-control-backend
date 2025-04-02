import { ApiProperty } from '@nestjs/swagger';

export class ReadDivisionDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;
}
