import { PickType } from '@nestjs/mapped-types';
import { CartridgeModelBaseDto } from 'src/Modules/cartridgeModel/dto/CartridgeModelBaseDto';

export class CartridgeModelWithGetAllCartridgeDto extends PickType(
  CartridgeModelBaseDto,
  ['id', 'name'],
) {}
