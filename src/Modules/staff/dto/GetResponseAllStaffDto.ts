import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class GetResponseAllStaffDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  patronimyc: string;

  @Expose()
  @ApiProperty()
  lastname: string;
}
