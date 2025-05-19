import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MinLength } from 'class-validator';

//Валится валидация
export class PostCreateStaffDto {
  @ApiProperty()
  @IsString()
  @Matches(/^\S+$/)
  @MinLength(4)
  name: string;

  @ApiProperty()
  @IsString()
  @Matches(/^\S+$/)
  @MinLength(4)
  lastname: string;

  @ApiProperty()
  @IsString()
  @Matches(/^\S+$/)
  patronimyc: string;

  creator: { id: number };
}
