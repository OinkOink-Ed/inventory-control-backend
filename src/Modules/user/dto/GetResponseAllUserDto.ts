import { ApiProperty } from '@nestjs/swagger';

export class GetResponseAllUserDto {
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

  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
      roleName: { type: 'string' },
    },
  })
  role: { id: number; roleName: string };
}
