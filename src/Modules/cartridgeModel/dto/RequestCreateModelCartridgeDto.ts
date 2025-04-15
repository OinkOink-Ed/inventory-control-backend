import { PickType } from '@nestjs/mapped-types';

import { CartridgeModelBaseRequestDto } from './CartridgeModelBaseRequestDto';

export class RequestCreateModelCartridgeDto extends PickType(
  CartridgeModelBaseRequestDto,
  ['name', 'creator'],
) {}
