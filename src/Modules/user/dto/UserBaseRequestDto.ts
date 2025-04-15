import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  Matches,
  Min,
  ValidateNested,
} from 'class-validator';
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

export class UserBaseRequestDto {
  @ApiProperty()
  @IsNumber()
  id: number;

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
  @IsObject()
  @ValidateNested()
  division: Division;

  //Нужно чтоб было Dto
  @ApiProperty({
    type: () => Role,
  })
  @IsObject()
  @ValidateNested()
  role: Role;

  //Нужно чтоб было Dto
  @ApiProperty({
    type: () => User,
  })
  @IsObject()
  @ValidateNested()
  creator: User;

  //Нужно чтоб было Dto
  @ApiProperty({
    type: () => User,
  })
  @IsArray()
  @ValidateNested({ each: true })
  createdUsers: User[];

  //Нужно чтоб было Dto
  @ApiProperty({
    type: () => Role,
  })
  @IsArray()
  @ValidateNested({ each: true })
  createdRoles: Role[];

  //Нужно чтоб было Dto
  @ApiProperty({
    type: () => Warehouse,
  })
  @IsArray()
  @ValidateNested({ each: true })
  createdWarehouses: Warehouse[];

  //Нужно чтоб было Dto
  @ApiProperty({
    type: () => Division,
  })
  @IsArray()
  @ValidateNested({ each: true })
  createdDivisions: Division[];

  //Нужно чтоб было Dto
  @ApiProperty({
    type: () => Kabinet,
  })
  @IsArray()
  @ValidateNested({ each: true })
  createdKabinets: Kabinet[];

  //Нужно чтоб было Dto
  @ApiProperty({
    type: () => CartridgeModel,
  })
  @IsArray()
  @ValidateNested({ each: true })
  createdCartridgeModels: CartridgeModel[];

  //Нужно чтоб было Dto
  @ApiProperty({
    type: () => Cartridge,
  })
  @IsArray()
  @ValidateNested({ each: true })
  createdCartridges: Cartridge[];

  //Нужно чтоб было Dto
  @ApiProperty({
    type: () => Movement,
  })
  @IsArray()
  @ValidateNested({ each: true })
  createdMovement: Movement[];

  //Нужно чтоб было Dto
  @ApiProperty({
    type: () => Receiving,
  })
  @IsArray()
  @ValidateNested({ each: true })
  createdReceiving: Receiving[];

  //Нужно чтоб было Dto
  @ApiProperty({
    type: () => Decommissioning,
  })
  @IsArray()
  @ValidateNested({ each: true })
  createdDecommissioning: Decommissioning[];

  //Нужно чтоб было Dto
  @ApiProperty({
    type: () => Delivery,
  })
  @IsArray()
  @ValidateNested({ each: true })
  createdDelivery: Delivery[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
