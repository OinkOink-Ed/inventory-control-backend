import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponse200 {
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  message: string;
}
