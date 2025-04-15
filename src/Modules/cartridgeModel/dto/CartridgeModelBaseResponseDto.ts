import { ApiProperty } from '@nestjs/swagger';
import { CartridgeBaseResponseDto } from 'src/Modules/cartridge/dto/CartridgeBaseResponseDto';
import { UserBaseResponseDto } from 'src/Modules/user/dto/UserBaseResponseDto';

export class CartridgeModelBaseResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({
    type: () => UserBaseResponseDto,
  })
  creator: UserBaseResponseDto;

  @ApiProperty({
    type: () => CartridgeBaseResponseDto,
  })
  cartridges: CartridgeBaseResponseDto[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
