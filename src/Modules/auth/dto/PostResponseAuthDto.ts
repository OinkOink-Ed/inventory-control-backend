import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PostResponseAuthDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  access_token: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  refresh_token: string;
}
