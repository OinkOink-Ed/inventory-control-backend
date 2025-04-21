import { ApiProperty } from '@nestjs/swagger';

export class GetResponseAllRole {
  @ApiProperty()
  id: number;

  @ApiProperty()
  roleName: string;
}
