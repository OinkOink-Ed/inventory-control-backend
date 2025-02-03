import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import {
  UserResponseWithModelsCartridgesDto,
  UserWhenCreateDto,
} from 'src/Modules/users/dto/createUserDto';

export class CreateModelCartridgeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  modelName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  printerName: string;

  @ApiProperty({
    type: () => UserWhenCreateDto,
  })
  @ValidateNested()
  @IsNotEmptyObject()
  @Type(() => UserWhenCreateDto)
  creator: UserWhenCreateDto;
}

export class CartridgeModelWhenRecipient {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  modelName: string;
}

export class ModelCartridgeResponse {
  @ApiProperty({
    type: () => UserResponseWithModelsCartridgesDto,
  })
  creator: UserResponseWithModelsCartridgesDto;

  @ApiProperty()
  id: number;

  @ApiProperty()
  printerName: string;

  @ApiProperty()
  modelName: string;
  @ApiProperty()
  createdAt: string;
  @ApiProperty()
  updatedAt: string;
}
