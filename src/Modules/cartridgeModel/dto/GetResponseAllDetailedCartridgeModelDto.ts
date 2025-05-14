import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

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
  creator: {
    id: number;
    lastname: string;
    name: string;
    patronimyc: string;
  };

  @Expose()
  @ApiProperty()
  createdAt: string;
}
