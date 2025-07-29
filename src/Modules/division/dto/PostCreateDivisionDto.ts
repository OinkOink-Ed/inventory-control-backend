import { ObjectIdDto } from '@common/dto/ObjectIdDto';
import { Division } from '@Modules/division/entities/Division';
import {
  Assert,
  StrictUserType,
  StrictWarehouseType,
  UserType,
  WarehouseType,
} from '@Modules/division/types/PostCreateDivisionTypes';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class PostCreateDivisionDto
  implements
    Pick<Assert & Division, 'name' | 'location'>,
    UserType,
    WarehouseType
{
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'],
  })
  @Type(() => ObjectIdDto)
  @ValidateNested()
  warehouse: StrictWarehouseType;

  creator: StrictUserType;
}
