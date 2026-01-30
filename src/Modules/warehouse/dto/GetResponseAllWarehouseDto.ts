import { ApiProperty } from '@nestjs/swagger';
import type { Warehouse } from '../entities/Warehouse';

export class GetResponseAllWarehouseDto
  implements Pick<Warehouse, 'id' | 'name'>
{
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
