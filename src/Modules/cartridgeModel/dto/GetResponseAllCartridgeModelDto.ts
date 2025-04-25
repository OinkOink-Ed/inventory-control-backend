import { ApiProperty } from '@nestjs/swagger';

export class GetResponseAllCartridgeModelDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;
}
