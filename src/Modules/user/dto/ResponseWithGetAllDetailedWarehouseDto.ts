import { PickType } from '@nestjs/mapped-types';
import { UserBaseResponseDto } from './UserBaseResponseDto';

export class ResponseWithGetAllDetailedWarehouseDto extends PickType(
  UserBaseResponseDto,
  ['id', 'lastname', 'name', 'patronimyc'],
) {}
