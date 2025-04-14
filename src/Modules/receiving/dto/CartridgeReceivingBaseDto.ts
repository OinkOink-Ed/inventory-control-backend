import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  ValidateNested,
} from 'class-validator';
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
  @IsObject()
  @ValidateNested()
  @Type(() => CartridgeBaseDto)
  cartridge: CartridgeBaseDto;

  @ApiProperty({
    type: () => ReceivingBaseDto,
  })
  @IsObject()
  @ValidateNested()
  @Type(() => ReceivingBaseDto)
  receiving: ReceivingBaseDto;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
