import { ObjectIdDto } from '@common/dto/ObjectIdDto';
import { UserStatus } from '@common/enums/UserStatus';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsIn,
  IsString,
  Matches,
  MinLength,
  ValidateNested,
} from 'class-validator';

//Валится валидация
export class PostCreateUserDto {
  @ApiProperty()
  @IsString()
  @Matches(/^\S+$/)
  @MinLength(4)
  username: string;

  @ApiProperty()
  @IsString()
  @Matches(/^\S+$/)
  @MinLength(8)
  password: string;

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

  @ApiProperty()
  @IsString()
  @Matches(/^\+7[0-9]{10}$/)
  telephone: string;

  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'],
  })
  @Type(() => ObjectIdDto)
  @ValidateNested()
  role: ObjectIdDto;

  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'],
  })
  @Type(() => ObjectIdDto)
  @ValidateNested()
  division: ObjectIdDto;

  @ApiProperty({
    enum: UserStatus,
  })
  @IsIn([UserStatus.ACTIVE])
  state: UserStatus.ACTIVE;

  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'],
  })
  @Type(() => ObjectIdDto)
  @ValidateNested()
  creator: UserStatus;
}
