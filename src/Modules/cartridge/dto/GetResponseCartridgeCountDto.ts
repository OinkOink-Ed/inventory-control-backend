import { ApiProperty } from '@nestjs/swagger';

export class GetResponseCartridgeCountDto {
  @ApiProperty()
  modelName: string;
  @ApiProperty()
  count: number;
}
