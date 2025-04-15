import { PickType } from '@nestjs/swagger';
import { WarehouseBaseResponseDto } from './WarehouseBaseResponseDto';

export class ResponseWithGetAllCartridgeDto extends PickType(
  WarehouseBaseResponseDto,
  ['id', 'name'],
) {}
