import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  patronimyc: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  telephone: string;

  @ApiProperty()
  @IsNotEmpty()
  role: role;

  // @ApiProperty()
  // divisionID: number;

  // @ApiProperty()
  // statusId: number;
}

//Нужно будет подумать об этих интерфейсах входных данных и их структуре через свагер

interface role {
  id: number;
}
