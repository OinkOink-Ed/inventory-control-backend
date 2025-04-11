import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, Matches, Min } from 'class-validator';
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

export class UserBaseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(/^\S+$/)
  @Min(4)
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(/^\S+$/)
  @Min(8)
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(/^\S+$/)
  @Min(4)
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(/^\S+$/)
  @Min(4)
  lastname: string;

  @ApiProperty()
  @IsString()
  @Matches(/^\S+$/)
  patronimyc: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(/^\+79[0-9]{9}$/)
  telephone: string;

  @ApiProperty({
    enum: UserStatus,
    enumName: 'UserStatus',
  })
  @IsEnum(UserStatus)
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
}
