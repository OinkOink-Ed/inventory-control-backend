import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class WarehouseWhithCreateManyCartridgeDto {
  @ApiProperty()
  @IsNumber()
  id: number;
}
