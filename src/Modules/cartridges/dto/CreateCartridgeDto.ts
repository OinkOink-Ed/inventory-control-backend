import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateCartridgeDto {
  @ApiProperty()
  @IsString()
  model: string;

  // @ApiProperty({ required: true, nullable: false, default: true })
  @IsNotEmpty()
  @IsBoolean()
  availability: boolean = true;
}

export class ResponsseCartridgeDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsString()
  model: string;

  @ApiProperty({ required: true, nullable: false, default: true })
  @IsNotEmpty()
  @IsBoolean()
  availability: boolean;
}
