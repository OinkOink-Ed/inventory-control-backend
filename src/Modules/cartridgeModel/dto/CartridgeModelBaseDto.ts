import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
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
  @IsObject()
  @ValidateNested()
  @Type(() => UserBaseDto)
  creator: UserBaseDto;

  @ApiProperty({
    type: () => CartridgeBaseDto,
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CartridgeBaseDto)
  cartridges: CartridgeBaseDto[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
