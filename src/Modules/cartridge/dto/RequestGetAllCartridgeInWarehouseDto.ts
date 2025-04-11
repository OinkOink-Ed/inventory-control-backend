import { PickType } from '@nestjs/swagger';
import { CartridgeBase } from './CartridgeBaseDto';

export class RequestGetAllCartridgeInWarehouseDto extends PickType(
  CartridgeBase,
  ['warehouse'],
) {}
