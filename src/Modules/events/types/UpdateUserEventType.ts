import { StrictDivision } from '@Modules/user/types/PutEditUserTypes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserEventType {
  @ApiProperty()
  userId: number;

  @ApiPropertyOptional({
    type: 'array',
    items: {
      properties: {
        id: { type: 'number' },
      },
    },
  })
  division: StrictDivision[] | undefined;
}
