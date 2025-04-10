import { PickType } from '@nestjs/swagger';
import { CartridgeBase } from './CartridgeBase';

export class RequestGetAllCartridgeInWarehouseDto extends PickType(
  CartridgeBase,
  ['warehouse'],
) {}
