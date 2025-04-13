import { PickType } from '@nestjs/mapped-types';
import { UserBaseDto } from 'src/Modules/user/dto/UserBaseDto';

export class ResponseUserWithGetAllDetailedCartridgeModelDto extends PickType(
  UserBaseDto,
  ['id', 'name', 'lastname', 'patronimyc'],
) {}
