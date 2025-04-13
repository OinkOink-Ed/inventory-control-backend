import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CartridgeBaseDto } from 'src/Modules/cartridge/dto/CartridgeBaseDto';
import { ReceivingBaseDto } from 'src/Modules/receiving/dto/ReceivingBaseDto';

export class CartridgeReceivingBaseDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    type: () => CartridgeBaseDto,
  })
  cartridge: CartridgeBaseDto;

  @ApiProperty({
    type: () => ReceivingBaseDto,
  })
  receiving: ReceivingBaseDto;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
