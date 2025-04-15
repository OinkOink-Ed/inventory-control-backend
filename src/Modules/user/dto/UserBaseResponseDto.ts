import { ApiProperty } from '@nestjs/swagger';
import { UserStatus } from 'src/common/enums/UserStatus';
import { Division } from 'src/Modules/division/entities/Division';
import { Role } from 'src/Modules/role/entities/Role';
import { User } from '../entities/User';
import { Warehouse } from 'src/Modules/warehouse/entities/Warehouse';
import { Kabinet } from 'src/Modules/kabinet/entities/Kabinet';
import { CartridgeModel } from 'src/Modules/cartridgeModel/entities/CartridgeModel';
import { Cartridge } from 'src/Modules/cartridge/entities/Cartridge';
import { Movement } from 'src/Modules/movement/entities/Movement';
import { Receiving } from 'src/Modules/receiving/entities/Receiving';
import { Decommissioning } from 'src/Modules/decommissioning/entities/Decommissioning';
import { Delivery } from 'src/Modules/delivery/entities/Delivery';

export class UserBaseResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  patronimyc: string;

  @ApiProperty()
  telephone: string;

  @ApiProperty({
    enum: UserStatus,
    enumName: 'UserStatus',
  })
  state: UserStatus;

  //Нужно чтоб было Dto
  @ApiProperty({
    type: () => Division,
  })
  division: Division;

  //Нужно чтоб было Dto
  @ApiProperty({
    type: () => Role,
  })
  role: Role;

  //Нужно чтоб было Dto
  @ApiProperty({
    type: () => User,
  })
  creator: User;

  //Нужно чтоб было Dto
  @ApiProperty({
    type: () => User,
  })
  createdUsers: User[];

  //Нужно чтоб было Dto
  @ApiProperty({
    type: () => Role,
  })
  createdRoles: Role[];

  //Нужно чтоб было Dto
  @ApiProperty({
    type: () => Warehouse,
  })
  createdWarehouses: Warehouse[];

  //Нужно чтоб было Dto
  @ApiProperty({
    type: () => Division,
  })
  createdDivisions: Division[];

  //Нужно чтоб было Dto
  @ApiProperty({
    type: () => Kabinet,
  })
  createdKabinets: Kabinet[];

  //Нужно чтоб было Dto
  @ApiProperty({
    type: () => CartridgeModel,
  })
  createdCartridgeModels: CartridgeModel[];

  //Нужно чтоб было Dto
  @ApiProperty({
    type: () => Cartridge,
  })
  createdCartridges: Cartridge[];

  //Нужно чтоб было Dto
  @ApiProperty({
    type: () => Movement,
  })
  createdMovement: Movement[];

  //Нужно чтоб было Dto
  @ApiProperty({
    type: () => Receiving,
  })
  createdReceiving: Receiving[];

  //Нужно чтоб было Dto
  @ApiProperty({
    type: () => Decommissioning,
  })
  createdDecommissioning: Decommissioning[];

  //Нужно чтоб было Dto
  @ApiProperty({
    type: () => Delivery,
  })
  createdDelivery: Delivery[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
