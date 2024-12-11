import { ApiProperty } from '@nestjs/swagger';

export class AccessAuthResponseDto {
  @ApiProperty()
  access_token: string;
}
