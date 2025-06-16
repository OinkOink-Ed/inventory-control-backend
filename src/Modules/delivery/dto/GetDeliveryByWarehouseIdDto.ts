import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class GetDeliveryByWarehouseIdDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  warehouse: string;

  @Expose()
  @ApiProperty()
  division: string;

  @Expose()
  @ApiProperty()
  kabinet: string;

  @Expose()
  @ApiProperty()
  lastname: string;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  patronimyc: string;

  @Expose()
  @ApiProperty()
  modelname: string;

  @Expose()
  @ApiProperty()
  count: number;

  @Expose()
  @ApiProperty({ type: 'string' })
  createdAt: Date;
}
