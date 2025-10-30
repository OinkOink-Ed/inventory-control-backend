import { ApiProperty } from '@nestjs/swagger';

export class ServiceCountCartridgeByModel {
  @ApiProperty()
  warehouseId: number;

  @ApiProperty()
  warehouseName: string;

  @ApiProperty()
  modelId: number;

  @ApiProperty()
  modelName: string;

  @ApiProperty()
  totalCount: string;
}
