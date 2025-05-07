import { Expose } from 'class-transformer';

export class ServiceFindUserDto {
  @Expose()
  id: number;

  @Expose()
  role: { roleName: string };
}
