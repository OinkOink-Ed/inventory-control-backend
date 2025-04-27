import { Expose } from 'class-transformer';

export class ServiceForAuthFindUserDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  username: string;

  @Expose()
  patronimyc: string;

  @Expose()
  lastname: string;

  @Expose()
  password: string;

  @Expose()
  role: { id: number; roleName: string };
}
