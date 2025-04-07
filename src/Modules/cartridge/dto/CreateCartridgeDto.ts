import { ApiProperty } from '@nestjs/swagger';
import type { CartridgeStatus } from 'src/common/types/CartridgeStatus';

export class CreateCartridgeDto {
  @ApiProperty()
  model: number;

  @ApiProperty()
  state: CartridgeStatus;
}
