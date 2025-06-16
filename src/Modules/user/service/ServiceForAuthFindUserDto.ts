import { Expose, Type } from 'class-transformer';

class Role {
  @Expose()
  roleName: string;
}

export class ServiceForAuthFindUserDto {
  @Expose()
  id: number;

  @Expose()
  password: string;

  @Expose()
  @Type(() => Role)
  role: Role;
}
