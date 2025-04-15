import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class DivisionBaseRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({
    type: () => ({ id: Number }),
  })
  @IsObject()
  warehouse: { id: number };

  @ApiProperty({
    type: () => ({ id: Number }),
  })
  @IsObject()
  creator: { id: number };
}
