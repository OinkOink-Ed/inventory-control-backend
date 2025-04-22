import { ApiProperty } from '@nestjs/swagger';
import { IsObject, ValidateNested } from 'class-validator';

export class GetAllCartridgeInWarehouseDto {
  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
  })
  @IsObject()
  @ValidateNested()
  warehouse: { id: number };
}
