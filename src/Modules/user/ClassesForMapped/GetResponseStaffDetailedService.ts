import { ApiProperty } from '@nestjs/swagger';
import {
  Assert,
  StaffDeliveryType,
  StrictStaffDeliveryType,
} from '../types/GetResponseStaffDetailedTypes';
import type { User } from '../entities/User';

export class GetResponseStaffDetailedService
  implements
    Pick<Assert & User, 'id' | 'name' | 'lastname' | 'patronimyc'>,
    StaffDeliveryType
{
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  patronimyc: string;

  acceptedCartridge: StrictStaffDeliveryType[];
}
