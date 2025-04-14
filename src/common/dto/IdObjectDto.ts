import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class IdObject {
  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  id: number;
}
