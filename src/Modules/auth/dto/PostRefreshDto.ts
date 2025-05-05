import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PostRefreshDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  token: string;
}
