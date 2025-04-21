import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { CartridgeReceivingBaseDto } from 'src/Modules/receiving/dto/CartridgeReceivingBaseDto';
import { UserBaseResponseDto } from 'src/Modules/user/dto/UserBaseResponseDto';
import { WarehouseBaseResponseDto } from 'src/Modules/warehouse/dto/WarehouseBaseResponseDto';

export class ReceivingBaseResponseDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    type: () => UserBaseResponseDto,
  })
  @IsObject()
  @ValidateNested()
  @Type(() => UserBaseResponseDto)
  creator: UserBaseResponseDto;

  @ApiProperty({
    type: () => WarehouseBaseResponseDto,
  })
  @IsObject()
  @ValidateNested()
  @Type(() => WarehouseBaseResponseDto)
  warehouse: WarehouseBaseResponseDto;

  @ApiProperty({
    type: () => CartridgeReceivingBaseDto,
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CartridgeReceivingBaseDto)
  action: CartridgeReceivingBaseDto[];
}
