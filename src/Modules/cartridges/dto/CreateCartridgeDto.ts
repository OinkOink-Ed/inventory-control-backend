import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmptyObject,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CartridgeModelWhenRecipient } from 'src/Modules/model-cartridges/dto/CreateModelCartridgeDto';
import { UserWhenCreateDto } from 'src/Modules/users/dto/createUserDto';

export class CreateCartridgeDto {
  @ApiProperty({
    type: () => CartridgeModelWhenRecipient,
  })
  @ValidateNested()
  @IsNotEmptyObject()
  @Type(() => CartridgeModelWhenRecipient)
  // @IsUserAlreadyExist() пока что не работает
  modelName: CartridgeModelWhenRecipient;

  @ApiProperty()
  @IsNumber()
  count: number;

  @ApiProperty()
  @IsNumber()
  user: UserWhenCreateDto;
}

export class ResponseCartridgeDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsString()
  model: string;
}

export class CreateMovementsDto {
  @ApiProperty()
  @IsString()
  // @IsUserAlreadyExist() пока что не работает
  modelCartridge: string;

  @ApiProperty()
  @IsNumber()
  count: number;

  @ApiProperty()
  @IsNumber()
  employee: UserWhenCreateDto;

  @ApiProperty()
  @IsString()
  type: 'Reception' | 'Delivery';
}
