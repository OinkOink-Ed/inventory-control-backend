import type { Division } from '@Modules/division/entities/Division';
import { ApiProperty } from '@nestjs/swagger';

export class GetResponseDivisionByWarehouseIdDto
  implements Pick<Division, 'id' | 'name'>
{
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
