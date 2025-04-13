import { PickType } from '@nestjs/mapped-types';
import { CartridgeReceivingBaseDto } from 'src/Modules/receiving/dto/CartridgeReceivingBaseDto';

export class CreateCartridgeReceivingDto extends PickType(
  CartridgeReceivingBaseDto,
  ['cartridge', 'receiving'],
) {}
