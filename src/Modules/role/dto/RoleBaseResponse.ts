import { ApiProperty } from '@nestjs/swagger';
import { UserBaseResponseDto } from 'src/Modules/user/dto/UserBaseResponseDto';

export class RoleBaseResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  roleName: string;

  @ApiProperty({
    type: () => UserBaseResponseDto,
  })
  creator: UserBaseResponseDto;

  @ApiProperty({
    type: () => UserBaseResponseDto,
  })
  users: UserBaseResponseDto[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
