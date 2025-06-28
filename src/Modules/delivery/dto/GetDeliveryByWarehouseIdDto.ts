import { ApiProperty } from '@nestjs/swagger';
import type { Delivery } from '../entities/Delivery';
import type { Warehouse } from '@Modules/warehouse/entities/Warehouse';

export class GetDeliveryByWarehouseIdDto
  implements Pick<Delivery, 'id'>, Pick<Warehouse, 'name'>
{
  @ApiProperty()
  id: number;

  @ApiProperty()
  warehouse: string;

  @ApiProperty()
  division: string;

  @ApiProperty()
  kabinet: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  patronimyc: string;

  @ApiProperty()
  modelname: string;

  @ApiProperty()
  count: number;

  @ApiProperty({ type: 'string' })
  createdAt: Date;
}
