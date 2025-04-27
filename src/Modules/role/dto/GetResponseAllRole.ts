import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class GetResponseAllRole {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  roleName: string;
}
