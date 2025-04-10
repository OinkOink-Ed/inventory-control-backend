import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponse {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;
}
