import { PickType } from '@nestjs/mapped-types';
import { CartridgeModelBaseDto } from 'src/Modules/cartridgeModel/dto/CartridgeModelBaseDto';

export class ResponseGetAllCartridgeModelDto extends PickType(
  CartridgeModelBaseDto,
  ['id', 'name'],
) {}
