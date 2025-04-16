import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';

export class RoleBaseRequest {
  @ApiProperty()
  roleName: string;

  @ApiProperty({
    type: () => ({ id: Number }),
  })
  @ValidateNested()
  creator: { id: number };
}
