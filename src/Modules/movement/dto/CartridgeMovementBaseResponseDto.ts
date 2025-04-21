import { ApiProperty } from '@nestjs/swagger';
import { CartridgeBaseResponseDto } from 'src/Modules/cartridge/dto/CartridgeBaseResponseDto';
import { MovementBaseResponseDto } from 'src/Modules/movement/dto/MovementBaseResponseDto';

export class CartridgeMovementBaseResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty({
    type: () => CartridgeBaseResponseDto,
  })
  cartridge: CartridgeBaseResponseDto;

  @ApiProperty({
    type: () => MovementBaseResponseDto,
  })
  movement: MovementBaseResponseDto;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
