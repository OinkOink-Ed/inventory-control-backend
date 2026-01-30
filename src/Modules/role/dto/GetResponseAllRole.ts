import { ApiProperty } from '@nestjs/swagger';
import type { Role } from '../entities/Role';

export class GetResponseAllRole implements Pick<Role, 'id' | 'roleName'> {
  @ApiProperty()
  id: number;

  @ApiProperty()
  roleName: string;
}
