import { ApiProperty } from '@nestjs/swagger';

export class ReadUserDto {
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
  telephone: string;

  @ApiProperty()
  roleId: number;

  @ApiProperty()
  divisionId: number;

  @ApiProperty()
  statusId: number;
}
