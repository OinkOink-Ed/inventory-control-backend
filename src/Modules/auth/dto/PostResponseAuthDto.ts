import { ApiProperty } from '@nestjs/swagger';

export class PostResponseAuthDto {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  refresh_token: string;
}
