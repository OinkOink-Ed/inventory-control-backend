import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class GetReponseAllDivisionDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  location: string;
}
