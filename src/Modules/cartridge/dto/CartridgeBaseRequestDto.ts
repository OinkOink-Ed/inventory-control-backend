import { ApiProperty } from '@nestjs/swagger';
import { IsObject, ValidateNested } from 'class-validator';

export class CartridgeBaseRequestDto {
  @ApiProperty({
    type: () => ({ id: Number }),
  })
  @IsObject()
  @ValidateNested()
  warehouse: { id: number };
}
