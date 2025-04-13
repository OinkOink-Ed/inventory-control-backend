import { PickType } from '@nestjs/mapped-types';
import { WarehouseBaseDto } from 'src/Modules/warehouse/dto/WarehouseBaseDto';

export class WarehouseWhithCreateReceivingDto extends PickType(
  WarehouseBaseDto,
  ['id'],
) {}
