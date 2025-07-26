import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import type { CartridgeModel } from '../entities/CartridgeModel';
import {
  Assert,
  CreatorType,
  StrictCreatorType,
} from '../types/PostCreateCartridgeModelTypes';

export class PostCreateCartridgeModelDto
  implements Pick<CartridgeModel & Assert, 'name'>, CreatorType
{
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  creator: StrictCreatorType;
}
