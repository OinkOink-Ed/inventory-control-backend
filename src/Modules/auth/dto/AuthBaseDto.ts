import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthBaseDto {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  access_token: string;
}
