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
import { UserBaseDto } from 'src/Modules/user/dto/UserBaseDto';
import { WarehouseBaseDto } from 'src/Modules/warehouse/dto/WarehouseBaseDto';

export class ReceivingBaseDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    type: () => UserBaseDto,
  })
  @IsObject()
  @ValidateNested()
  @Type(() => UserBaseDto)
  creator: UserBaseDto;

  @ApiProperty({
    type: () => WarehouseBaseDto,
  })
  @IsObject()
  @ValidateNested()
  @Type(() => WarehouseBaseDto)
  warehouse: WarehouseBaseDto;

  @ApiProperty({
    type: () => CartridgeReceivingBaseDto,
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CartridgeReceivingBaseDto)
  action: CartridgeReceivingBaseDto[];
}
