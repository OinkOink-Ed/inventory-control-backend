import { ObjectIdDto } from '@common/dto/ObjectIdDto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class PostCreateCartridgeModelDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'], // Указываем, что id обязателен
  })
  @Type(() => ObjectIdDto)
  @ValidateNested()
  @IsNotEmpty()
  creator: ObjectIdDto;
}
