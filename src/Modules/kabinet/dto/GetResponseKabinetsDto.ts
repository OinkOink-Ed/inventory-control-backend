import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class GetResponseKabinetsDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  number: string;

  @Expose()
  @ApiProperty({
    type: 'object',
    properties: {
      name: { type: 'string' },
    },
    required: ['name'],
  })
  division: { name: string };
}
