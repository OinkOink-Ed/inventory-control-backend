import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthRequestDto {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;
}
