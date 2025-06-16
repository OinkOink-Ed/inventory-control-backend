import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

class Division {
  @Expose()
  name: string;
}

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
  @Type(() => Division)
  division: Division;

  @Expose()
  @ApiProperty({ type: 'string' })
  createdAt: Date;
}
