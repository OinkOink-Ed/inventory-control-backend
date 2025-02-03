import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCartridgeDto {
  @ApiProperty()
  @IsString()
  // @IsUserAlreadyExist() пока что не работает
  modelName: string;

  @ApiProperty()
  @IsNumber()
  count: number;
}

export class ResponseCartridgeDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsString()
  model: string;
}
