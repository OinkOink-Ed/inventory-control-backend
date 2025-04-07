import { ApiProperty } from '@nestjs/swagger';
// import { CartridgeStatus } from 'src/common/types/CartridgeStatus';

export class CreateCartridgeDto {
  @ApiProperty()
  model: number;

  @ApiProperty()
  state: CartridgeStatus;
}

//Разобраться про циклическую зависимость enum если использовать один и тот же enum в DTO и в сущности

enum CartridgeStatus {
  RECEIVED = 'Received',
  MOVED = 'Moved',
  ISSUED = 'Issued',
  DECOMMISSIONED = 'Decommissioned',
}
