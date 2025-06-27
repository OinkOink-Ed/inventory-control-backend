import { ApiProperty } from '@nestjs/swagger';
import { CartridgeModel } from '../entities/CartridgeModel';

export class GetResponseAllCartridgeModelDto
  implements Pick<CartridgeModel, 'id' | 'name'>
{
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
