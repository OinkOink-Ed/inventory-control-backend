import type { User } from '../entities/User';
import { Assert, RoleType, StrictRole } from '../types/ServiceForFindUserType';

export class ServiceForFindUser implements Pick<Assert & User, 'id'>, RoleType {
  id: number;

  role: StrictRole;
}
