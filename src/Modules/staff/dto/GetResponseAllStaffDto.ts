import { ApiProperty } from '@nestjs/swagger';
import type { Staff } from '../entities/Staff';

export class GetResponseAllStaffDto
  implements
    Pick<
      Staff,
      'id' | 'name' | 'lastname' | 'financiallyResponsiblePerson' | 'patronimyc'
    >
{
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  patronimyc: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  financiallyResponsiblePerson: boolean;
}
