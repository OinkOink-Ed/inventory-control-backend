import { ApiProperty } from '@nestjs/swagger';

export class GetResponseAcceptedCartridgeByUserDto {
  @ApiProperty({
    type: 'array',
    items: {
      properties: {
        id: { type: 'number' },
        model: { type: 'string' },
        kabinet: { type: 'string' },
        division: { type: 'string' },
        count: { type: 'number' },
        createdAt: { type: 'string' },
      },
      required: ['id', 'model', 'kabinet', 'division', 'count', 'createdAt'],
    },
  })
  acceptedCartridge: {
    id: number;
    model: string;
    count: number;
    kabinet: string;
    division: string;
    createdAt: Date;
  }[];
}
