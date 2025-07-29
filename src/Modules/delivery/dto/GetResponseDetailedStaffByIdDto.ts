import { ApiProperty, PickType } from '@nestjs/swagger';
import { GetResponseDetailedStaffByIdService } from '../ClassesForMapped/GetResponseDetailedStaffByIdService';

export class GetResponseDetailedStaffByIdDto extends PickType(
  GetResponseDetailedStaffByIdService,
  ['id', 'division', 'kabinet'] as const,
) {
  @ApiProperty({ type: 'string' })
  model: string;

  @ApiProperty({ type: 'number' })
  count: number;
}
