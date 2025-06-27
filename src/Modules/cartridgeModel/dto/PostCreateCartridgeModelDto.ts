import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import type { CartridgeModel } from '../entities/CartridgeModel';
import type { User } from '@Modules/user/entities/User';
import { AssertTManyProperty } from '@common/utils/typesUtils';

export type Assert = AssertTManyProperty<
  CartridgeModel,
  {
    creator: Pick<User, 'id'>;
  }
>;

type StrictCreatorType = Pick<User, 'id'>;
type CreatorType = { creator: StrictCreatorType };

export class PostCreateCartridgeModelDto
  implements Pick<CartridgeModel & Assert, 'name'>, CreatorType
{
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  creator: StrictCreatorType;
}
