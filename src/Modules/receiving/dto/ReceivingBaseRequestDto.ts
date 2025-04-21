import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsObject,
  IsPositive,
  ValidateNested,
} from 'class-validator';
import { CartridgeStatus } from 'src/common/enums/CartridgeStatus';
import { UserBaseRequestDto } from 'src/Modules/user/dto/UserBaseRequestDto';

export class RequestCreateReceivingDto extends PickType(UserBaseRequestDto, [
  'id',
]) {
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
