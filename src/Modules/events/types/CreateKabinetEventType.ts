import { StrictDivisionType } from '@Modules/kabinet/types/PostCreateKabinetTypes';
import { ApiProperty } from '@nestjs/swagger';

export class CreateKabinetEventType {
  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'],
  })
  division: StrictDivisionType;
}
