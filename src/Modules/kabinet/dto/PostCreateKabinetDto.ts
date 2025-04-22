import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';

export class PostCreateKabinetDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  number: string;

  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
  })
  @IsObject()
  @ValidateNested()
  division: { id: number };

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
