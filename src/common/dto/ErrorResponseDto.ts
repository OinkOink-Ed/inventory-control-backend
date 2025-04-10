import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty()
  statusCode: number;

  @ApiProperty({ type: 'string' })
  message: string;

  @ApiProperty()
  error?: string;

  @ApiProperty({
    type: 'object',
    additionalProperties: { type: 'string' },
  })
  details?: Record<string, any>;
}
