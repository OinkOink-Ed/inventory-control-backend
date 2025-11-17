import { ApiProperty } from '@nestjs/swagger';

export class LogoutUserEventType {
  @ApiProperty()
  userId: number;
}
