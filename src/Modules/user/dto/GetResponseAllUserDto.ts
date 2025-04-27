import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class GetResponseAllUserDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  username: string;

  @Expose()
  @ApiProperty()
  patronimyc: string;

  @Expose()
  @ApiProperty()
  lastname: string;

  @Expose()
  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
      roleName: { type: 'string' },
    },
  })
  role: { id: number; roleName: string };
}
