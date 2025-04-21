import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsObject,
  IsString,
  Matches,
  Min,
  ValidateNested,
} from 'class-validator';

export class PostCreateuserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(/^\S+$/)
  @Min(4)
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(/^\S+$/)
  @Min(8)
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(/^\S+$/)
  @Min(4)
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(/^\S+$/)
  @Min(4)
  lastname: string;

  @ApiProperty()
  @IsString()
  @Matches(/^\S+$/)
  patronimyc: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(/^\+79[0-9]{9}$/)
  telephone: string;

  @ApiProperty({
    type: () => ({ id: Number }),
  })
  @IsObject()
  @ValidateNested()
  role: { id: number };

  @ApiProperty({
    type: () => () => ({ id: Number }),
  })
  @IsObject()
  @ValidateNested()
  creator: { id: number };
}
