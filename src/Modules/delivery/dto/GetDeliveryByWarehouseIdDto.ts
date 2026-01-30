import { ApiProperty, PickType } from '@nestjs/swagger';
import { GetDeliveryByWarehouseIdService } from '../ClassesForMapped/GetDeliveryByWarehouseIdService';

export class GetDeliveryByWarehouseIdDto extends PickType(
  GetDeliveryByWarehouseIdService,
  [
    'id',
    'warehouse',
    'division',
    'kabinet',
    'creator',
    'accepting',
    'createdAt',
  ] as const,
) {
  @ApiProperty({ type: 'string' })
  model: string;

  @ApiProperty({ type: 'number' })
  count: number;
}
