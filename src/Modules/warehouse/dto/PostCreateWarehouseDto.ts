import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import type { Warehouse } from '../entities/Warehouse';
import { CreatorType } from '@common/dto/types';

type AssertWarehouseHasCreator = Warehouse extends { creator: any }
  ? Warehouse
  : never;

export class PostCreateWarehouseDto
  implements Pick<AssertWarehouseHasCreator, 'name'>, CreatorType
{
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  creator: { id: number };
}
