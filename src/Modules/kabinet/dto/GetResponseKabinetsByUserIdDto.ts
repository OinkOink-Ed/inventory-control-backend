import type { Kabinet } from '@Modules/kabinet/entities/Kabinet';
import { ApiProperty } from '@nestjs/swagger';

export class GetResponseKabinetsByUserIdDto
  implements Pick<Kabinet, 'id' | 'number'>
{
  @ApiProperty()
  id: number;

  @ApiProperty()
  number: string;
}
