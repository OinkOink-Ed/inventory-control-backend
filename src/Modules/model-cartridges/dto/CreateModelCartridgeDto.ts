import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmptyObject, IsString, ValidateNested } from 'class-validator';
import {
  UserResponseWithModelsCartridgesDto,
  UserWhenCreatemodelDto,
} from 'src/Modules/users/dto/createUserDto';

export class CreateModelCartridgeDto {
  @ApiProperty()
  @IsString()
  modelName: string;

  @ApiProperty({
    type: () => UserWhenCreatemodelDto,
  })
  @ValidateNested()
  @IsNotEmptyObject()
  @Type(() => UserWhenCreatemodelDto)
  creator: UserWhenCreatemodelDto;
}

export class ModelCartridgeResponse {
  @ApiProperty({
    type: () => UserResponseWithModelsCartridgesDto,
  })
  creator: UserResponseWithModelsCartridgesDto;

  @ApiProperty()
  id: number;

  @ApiProperty()
  modelName: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}

export class ModelCartridgeResponse2 {
  @ApiProperty({
    type: () => UserResponseWithModelsCartridgesDto,
  })
  creator: UserResponseWithModelsCartridgesDto;

  @ApiProperty()
  id: number;

  @ApiProperty()
  modelName: string;
  @ApiProperty()
  createdAt: string;
  @ApiProperty()
  updatedAt: string;
}
