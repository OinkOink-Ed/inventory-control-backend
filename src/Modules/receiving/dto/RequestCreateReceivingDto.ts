import { IntersectionType } from '@nestjs/mapped-types';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsObject,
  IsPositive,
  ValidateNested,
} from 'class-validator';
import { IdObject } from 'src/common/dto/IdObjectDto';
import { CartridgeStatus } from 'src/common/enums/CartridgeStatus';
import { CartridgeBaseDto } from 'src/Modules/cartridge/dto/CartridgeBaseDto';
import { UserBaseDto } from 'src/Modules/user/dto/UserBaseDto';

export class RequestCreateReceivingDto extends IntersectionType(
  PickType(CartridgeBaseDto, ['state']),
  PickType(UserBaseDto, ['id']),
) {
  @ApiProperty({
    enum: CartridgeStatus,
    enumName: 'CartridgeStatus',
  })
  @IsEnum([CartridgeStatus.RECEIVED])
  state: CartridgeStatus.RECEIVED;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  count: number;

  @ApiProperty({
    type: () => IdObject,
  })
  @IsObject()
  @ValidateNested()
  @Type(() => IdObject)
  model: IdObject;

  @ApiProperty({
    type: () => IdObject,
  })
  @IsObject()
  @ValidateNested()
  @Type(() => IdObject)
  warehouse: IdObject;
}
