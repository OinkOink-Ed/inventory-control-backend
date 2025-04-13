import { IntersectionType, PickType } from '@nestjs/mapped-types';
import { CartridgeModelBaseDto } from 'src/Modules/cartridgeModel/dto/CartridgeModelBaseDto';
import { UserBaseDto } from 'src/Modules/user/dto/UserBaseDto';

export class RequestCreateCartridgeModelDto extends IntersectionType(
  PickType(CartridgeModelBaseDto, ['name']),
  PickType(UserBaseDto, ['id']),
) {}
