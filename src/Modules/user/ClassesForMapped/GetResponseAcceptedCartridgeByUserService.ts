import { ApiProperty } from '@nestjs/swagger';
import {
  Assert,
  StaffDeliveryType,
  StrictStaffDeliveryType,
} from '../types/GetResponseUserCardTypes';
import type { User } from '../entities/User';

export class GetResponseAcceptedCartridgeByUserService
  implements Pick<Assert & User, 'id'>, StaffDeliveryType
{
  @ApiProperty()
  id: number;

  acceptedCartridge: StrictStaffDeliveryType[];
}
