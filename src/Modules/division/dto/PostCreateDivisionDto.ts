import { Division } from '@Modules/division/entities/Division';
import {
  Assert,
  StrictUserType,
  StrictWarehouseType,
  UserType,
  WarehouseType,
} from '@Modules/division/types/PostCreateDivisionTypes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

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
  warehouse: StrictWarehouseType;

  creator: StrictUserType;
}
