import { ApiProperty } from '@nestjs/swagger';
import { IsObject, ValidateNested } from 'class-validator';

export class WarehouseBaseRequestDto {
  @ApiProperty({
    type: () => ({ id: Number }),
  })
  @IsObject()
  @ValidateNested()
  creator: { id: number };
}
