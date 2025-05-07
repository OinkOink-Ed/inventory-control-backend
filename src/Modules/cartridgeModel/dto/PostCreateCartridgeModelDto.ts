import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PostCreateCartridgeModelDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  creator: { id: number };
}
