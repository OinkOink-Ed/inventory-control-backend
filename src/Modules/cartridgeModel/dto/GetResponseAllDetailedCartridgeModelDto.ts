import { ApiProperty } from '@nestjs/swagger';
import type { CartridgeModel } from '../entities/CartridgeModel';
import type { User } from '@Modules/user/entities/User';
import { AssertTManyProperty } from '@common/utils/typesUtils';

export type Assert = AssertTManyProperty<
  CartridgeModel,
  {
    creator: Pick<User, 'id' | 'lastname' | 'name' | 'patronimyc'>;
  }
>;

type StrictCreatorType = Pick<User, 'id' | 'lastname' | 'name' | 'patronimyc'>;
type CreatorType = { creator: StrictCreatorType };

export class GetResponseAllDetailedCartridgeModelDto
  implements
    Pick<CartridgeModel & Assert, 'id' | 'name' | 'createdAt'>,
    CreatorType
{
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
      lastname: { type: 'string' },
      name: { type: 'string' },
      patronimyc: { type: 'string' },
    },
    required: ['id', 'lastname', 'name', 'patronimyc'],
  })
  creator: StrictCreatorType;

  @ApiProperty({ type: 'string' })
  createdAt: Date;
}
