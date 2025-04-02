import { ApiProperty } from '@nestjs/swagger';

export class CreateCartridgeDto {
  @ApiProperty()
  cartridgeModelId: number;

  @ApiProperty()
  statusId: number;
}
