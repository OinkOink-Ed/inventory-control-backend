import { PickType } from '@nestjs/swagger';
import { CartridgeBaseRequestDto } from './CartridgeBaseRequestDto';

export class RequestGetAllCartridgeInWarehouseDto extends PickType(
  CartridgeBaseRequestDto,
  ['warehouse'],
) {}
