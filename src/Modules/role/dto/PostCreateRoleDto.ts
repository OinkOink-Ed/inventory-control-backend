import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';

export class PostCreateroleDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  roleName: string;

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
