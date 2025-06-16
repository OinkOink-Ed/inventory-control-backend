import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

class Creator {
  @Expose()
  id: number;

  @Expose()
  lastname: string;

  @Expose()
  name: string;

  @Expose()
  patronimyc: string;
}

export class GetResponseAllDetailedCartridgeModelDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
      lastname: { type: 'string' },
      name: { type: 'string' },
      patronimyc: { type: 'string' },
    },
  })
  @Type(() => Creator)
  creator: Creator;

  @Expose()
  @ApiProperty({ type: 'string' })
  createdAt: Date;
}
