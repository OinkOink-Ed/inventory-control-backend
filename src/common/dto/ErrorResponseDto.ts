import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
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

export class ErrorResponseDto400 extends ErrorResponseDto {
  @ApiProperty({ type: 'number', enum: [400] })
  statusCode: 400;
}
export class ErrorResponseDto403 extends ErrorResponseDto {
  @ApiProperty({ type: 'number', enum: [403] })
  statusCode: 403;
}
export class ErrorResponseDto404 extends ErrorResponseDto {
  @ApiProperty({ type: 'number', enum: [404] })
  statusCode: 404;
}
export class ErrorResponseDto408 extends ErrorResponseDto {
  @ApiProperty({ type: 'number', enum: [408] })
  statusCode: 408;
}
export class ErrorResponseDto500 extends ErrorResponseDto {
  @ApiProperty({ type: 'number', enum: [500] })
  statusCode: 500;
}
