import { PickType } from '@nestjs/mapped-types';
import { UserBaseResponseDto } from './UserBaseResponseDto';
import { ApiProperty } from '@nestjs/swagger';

export class ServiceForAuthFindUserDto extends PickType(UserBaseResponseDto, [
  'id',
  'name',
  'username',
  'patronimyc',
  'lastname',
  'password',
]) {
  @ApiProperty({
    type: () => ({ id: Number, roleName: String }),
  })
  role: { id: number; roleName: string };
}
