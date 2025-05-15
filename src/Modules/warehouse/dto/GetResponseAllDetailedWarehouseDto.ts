import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class GetResponseAllDetailedWarehouseDto {
  @Expose()
  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
      kabinets: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            number: { type: 'string' },
          },
          required: ['id', 'number'],
        },
      },
    },
    required: ['id', 'kabinets'],
  })
  division: { id: number; kabinets: Array<{ id: number; number: string }> };
}
