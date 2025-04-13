import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CartridgeReceivingBaseDto } from 'src/Modules/receiving/dto/CartridgeReceivingBaseDto';
import { UserBaseDto } from 'src/Modules/user/dto/UserBaseDto';
import { WarehouseBaseDto } from 'src/Modules/warehouse/dto/WarehouseBaseDto';

export class ReceivingBaseDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    type: () => UserBaseDto,
  })
  creator: UserBaseDto;

  @ApiProperty({
    type: () => WarehouseBaseDto,
  })
  warehouse: WarehouseBaseDto;

  @ApiProperty({
    type: () => CartridgeReceivingBaseDto,
    isArray: true,
  })
  action: CartridgeReceivingBaseDto[];
}
