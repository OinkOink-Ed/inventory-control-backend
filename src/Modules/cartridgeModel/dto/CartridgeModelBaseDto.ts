import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CartridgeBaseDto } from 'src/Modules/cartridge/dto/CartridgeBaseDto';
import { UserBaseDto } from 'src/Modules/user/dto/UserBaseDto';

export class CartridgeModelBaseDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: () => UserBaseDto,
  })
  creator: UserBaseDto;

  @ApiProperty({
    type: () => CartridgeBaseDto,
    isArray: true,
  })
  cartridges: CartridgeBaseDto[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
