import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PostCreateroleDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  roleName: string;

  creator: { id: number };
}
