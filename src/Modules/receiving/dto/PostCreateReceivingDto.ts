import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsObject,
  IsPositive,
  ValidateNested,
} from 'class-validator';

export class PostCreateReceivingDto {
  @ApiProperty({
    type: () => ({ id: Number }),
  })
  @IsObject()
  @ValidateNested()
  model: { id: number };

  @ApiProperty({
    type: () => ({ id: Number }),
  })
  @IsObject()
  @ValidateNested()
  warehouse: { id: number };

  @ApiProperty({
    type: () => ({ id: Number }),
  })
  @IsObject()
  @ValidateNested()
  creator: { id: number };

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  count: number;
}
