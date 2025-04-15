import { PickType } from '@nestjs/mapped-types';
import { UserBaseResponseDto } from './UserBaseResponseDto';

export class ResponseUserWithGetAllDetailedCartridgeModelDto extends PickType(
  UserBaseResponseDto,
  ['id', 'name', 'lastname', 'patronimyc'],
) {}
