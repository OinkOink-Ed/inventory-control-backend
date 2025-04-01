import { ApiProperty } from '@nestjs/swagger';

export class CreateRecievingDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;
}
