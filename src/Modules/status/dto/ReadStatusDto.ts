import { ApiProperty } from '@nestjs/swagger';

export class ReadStatusDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
