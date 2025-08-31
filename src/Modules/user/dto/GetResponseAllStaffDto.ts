import { ApiProperty } from '@nestjs/swagger';
import type { User } from '@Modules/user/entities/User';

export class GetResponseAllStaffDto
  implements Pick<User, 'id' | 'name' | 'lastname' | 'patronimyc'>
{
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  patronimyc: string;

  @ApiProperty()
  lastname: string;
}
