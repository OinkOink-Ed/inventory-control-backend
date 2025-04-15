import { PickType } from '@nestjs/mapped-types';
import { CartridgeModelBaseResponseDto } from './CartridgeModelBaseResponseDto';

export class ResponseGetAllCartridgeModelDto extends PickType(
  CartridgeModelBaseResponseDto,
  ['id', 'name'],
) {}
