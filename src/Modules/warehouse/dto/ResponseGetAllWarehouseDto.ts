import { PickType } from '@nestjs/mapped-types';
import { WarehouseBaseResponseDto } from './WarehouseBaseResponseDto';

export class ResponseGetAllWarehouseDto extends PickType(
  WarehouseBaseResponseDto,
  ['id'],
) {}
