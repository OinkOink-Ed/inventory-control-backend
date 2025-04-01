import { ApiProperty } from '@nestjs/swagger';

export class CreateCartridgeModelDto {
  @ApiProperty()
  name: string;
}
