import type { Role } from '../entities/Role';

export class ServiceFindRoleName implements Pick<Role, 'roleName'> {
  roleName: string;
}
