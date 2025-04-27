import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class GetResponseAllKabinetDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  number: string;
}
