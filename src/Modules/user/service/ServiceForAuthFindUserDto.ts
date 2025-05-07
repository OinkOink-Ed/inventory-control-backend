import { Expose } from 'class-transformer';

export class ServiceForAuthFindUserDto {
  @Expose()
  id: number;

  @Expose()
  password: string;

  @Expose()
  role: { roleName: string };
}
