export class ServiceForAuthFindUserDto {
  id: number;
  name: string;
  username: string;
  patronimyc: string;
  lastname: string;
  password: string;
  role: { id: number; roleName: string };
}
