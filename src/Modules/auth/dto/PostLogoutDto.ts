import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { RefreshToken } from '../entities/RefreshToken';

export class PostlogoutDto implements Pick<RefreshToken, 'token'> {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  token: string;
}
