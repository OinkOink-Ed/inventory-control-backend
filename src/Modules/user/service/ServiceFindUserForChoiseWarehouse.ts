import type { User } from '../entities/User';
import {
  Assert,
  DivisionType,
  StrictDivision,
} from '../types/ServiceFindUserForChoiseWarehouseTypes';

export class ServiceFindUserForChoiseWarehouse
  implements Pick<Assert & User, 'id'>, DivisionType
{
  id: number;

  division: StrictDivision[];
}
