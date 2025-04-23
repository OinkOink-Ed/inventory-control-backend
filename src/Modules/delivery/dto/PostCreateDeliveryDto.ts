import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsObject,
  IsPositive,
  ValidateNested,
} from 'class-validator';

export class PostCreateDeliveryDto {
  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
  })
  @IsObject()
  @ValidateNested()
  model: { id: number };

  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
  })
  @IsObject()
  @ValidateNested()
  kabinet: { id: number };

  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
  })
  @IsObject()
  @ValidateNested()
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
  warehouse: { id: number };

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  count: number;

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
