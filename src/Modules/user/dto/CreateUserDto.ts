import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  patronimyc: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  telephone: string;

  @ApiProperty()
  roleId: number;

  @ApiProperty()
  divisionID: number;

  @ApiProperty()
  statusId: number;
}
