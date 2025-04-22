import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';

export class PostCreateCartridgeModelDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
  })
  @IsObject()
  @ValidateNested()
  creator: { id: number };
}
