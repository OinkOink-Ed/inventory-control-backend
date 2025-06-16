import { Expose, Type } from 'class-transformer';

class Role {
  @Expose()
  roleName: string;
}

export class ServiceFindUserDto {
  @Expose()
  id: number;

  @Expose()
  @Type(() => Role)
  role: Role;
}
