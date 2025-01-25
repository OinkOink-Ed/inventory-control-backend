import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import {
  RoleResponsWhithUserDto,
  RoleWhenCreatingUserDto,
} from 'src/Modules/role/dto/createRoleDto';

export class CreateUserDto {
  @ApiProperty({ required: true, nullable: false, minLength: 4 })
  @IsNotEmpty()
  @MinLength(4)
  @IsString()
  nickname: string;

  @ApiProperty({ required: true, nullable: false, minLength: 4 })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  surname: string;

  @ApiProperty({ required: true, nullable: false, minLength: 4 })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  name: string;

  @ApiProperty()
  @IsString()
  patronimyc: string;

  @ApiProperty({ required: true, nullable: false, minLength: 4 })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  password: string;

  @ApiProperty({
    type: () => RoleWhenCreatingUserDto,
  })
  @ValidateNested()
  @IsNotEmptyObject()
  @Type(() => RoleWhenCreatingUserDto)
  role: RoleWhenCreatingUserDto;
}

export class UserResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ required: true, nullable: false, minLength: 4 })
  @IsNotEmpty()
  @MinLength(4)
  @IsString()
  nickname: string;

  @ApiProperty({ required: true, nullable: false, minLength: 4 })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  surname: string;

  @ApiProperty({ required: true, nullable: false, minLength: 4 })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  name: string;

  @ApiProperty()
  @IsString()
  patronimyc: string;

  @ApiProperty({
    type: () => RoleResponsWhithUserDto,
  })
  role: RoleResponsWhithUserDto;
}

export class UserWhenCreatemodelDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class UserResponseWithModelsCartridgesDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  surname: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  patronimyc: string;
}
