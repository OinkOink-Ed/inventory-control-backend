import { PickType } from '@nestjs/swagger';
import { CartridgeBaseDto } from './CartridgeBaseDto';

export class RequestGetAllCartridgeInWarehouseDto extends PickType(
  CartridgeBaseDto,
  ['warehouse'],
) {}
