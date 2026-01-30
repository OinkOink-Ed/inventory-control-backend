import type { Division } from '@Modules/division/entities/Division';
import { ApiProperty } from '@nestjs/swagger';

export class GetReponseAllDivisionDto
  implements Pick<Division, 'id' | 'name' | 'location'>
{
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  location: string;
}
