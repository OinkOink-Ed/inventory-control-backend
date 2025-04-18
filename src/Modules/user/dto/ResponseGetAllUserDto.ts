import { PickType } from '@nestjs/mapped-types';
import { UserBaseResponseDto } from './UserBaseResponseDto';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseGetAllUserDto extends PickType(UserBaseResponseDto, [
  'id',
  'name',
  'username',
  'patronimyc',
  'lastname',
]) {
  @ApiProperty({
    type: () => ({ id: Number, roleName: String }),
  })
  role: { id: number; roleName: string };
}
