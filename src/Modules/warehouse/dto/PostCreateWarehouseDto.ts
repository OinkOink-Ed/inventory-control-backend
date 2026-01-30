import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import type { Warehouse } from '../entities/Warehouse';
import {
  Assert,
  CreatorType,
  StrictCreator,
} from '../types/PostCreateWarehouseType';

export class PostCreateWarehouseDto
  implements Pick<Assert & Warehouse, 'name'>, CreatorType
{
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  creator: StrictCreator;
}
