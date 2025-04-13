import { PickType } from '@nestjs/mapped-types';
import { CartridgeModelBaseDto } from 'src/Modules/cartridgeModel/dto/CartridgeModelBaseDto';

export class CartridgeModelWithCreateReceivingDto extends PickType(
  CartridgeModelBaseDto,
  ['id'],
) {}
