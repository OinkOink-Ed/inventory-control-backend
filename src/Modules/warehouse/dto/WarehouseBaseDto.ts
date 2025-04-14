import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { WarehouseStatus } from 'src/common/enums/WarehouseStatus';
import { CartridgeBaseDto } from 'src/Modules/cartridge/dto/CartridgeBaseDto';
import { Decommissioning } from 'src/Modules/decommissioning/entities/Decommissioning';
import { Delivery } from 'src/Modules/delivery/entities/Delivery';
import { Division } from 'src/Modules/division/entities/Division';
import { Movement } from 'src/Modules/movement/entities/Movement';
import { ReceivingBaseDto } from 'src/Modules/receiving/dto/ReceivingBaseDto';
import { UserBaseDto } from 'src/Modules/user/dto/UserBaseDto';

export class WarehouseBaseDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  openningDate: Date;

  @ApiProperty()
  closingDate: Date;

  @ApiProperty({
    enum: WarehouseStatus,
    enumName: 'WarehouseStatus',
  })
  @IsEnum(WarehouseStatus)
  state: WarehouseStatus;

  // Должен быть DTO
  @ApiProperty({
    type: () => Division,
  })
  @IsObject()
  @ValidateNested()
  @Type(() => Division)
  division: Division;

  @ApiProperty({
    type: () => UserBaseDto,
  })
  @IsObject()
  @ValidateNested()
  @Type(() => UserBaseDto)
  creator: UserBaseDto;

  @ApiProperty({
    type: () => CartridgeBaseDto,
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CartridgeBaseDto)
  cartridges: CartridgeBaseDto[];

  //Должен быть DTO
  @ApiProperty({
    type: () => Movement,
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Movement)
  movementOut: Movement[];

  //Должен быть DTO
  @ApiProperty({
    type: () => Movement,
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Movement)
  movementIn: Movement[];

  @ApiProperty({
    type: () => ReceivingBaseDto,
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReceivingBaseDto)
  receiving: ReceivingBaseDto[];

  //Здесь должно быть DTO
  @ApiProperty({
    type: () => Decommissioning,
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Decommissioning)
  decommissioning: Decommissioning[];

  //Здесь должно быть DTO
  @ApiProperty({
    type: () => Delivery,
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Delivery)
  delivery: Delivery[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
