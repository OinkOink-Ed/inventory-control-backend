import type { User } from '../entities/User';
import {
  Assert,
  RoleType,
  StrictRole,
} from '../types/ServiceForAuthFindUserTypes';

export class ServiceForAuthFindUser
  implements Pick<Assert & User, 'id' | 'password'>, RoleType
{
  id: number;

  password: string;

  role: StrictRole;
}
