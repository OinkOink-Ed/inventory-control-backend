import { ApiProperty } from '@nestjs/swagger';

export class GetResponseAllDetailedWarehouseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
      lastname: { type: 'string' },
      name: { type: 'string' },
      patronimyc: { type: 'string' },
    },
  })
  creator: { id: number; lastname: string; name: string; patronimyc: string };
}
