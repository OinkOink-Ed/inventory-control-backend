import { ApiProperty } from '@nestjs/swagger';
import { Delivery } from 'src/Modules/delivery/entities/Delivery';
import { Kabinet } from 'src/Modules/kabinet/entities/Kabinet';
import { UserBaseResponseDto } from 'src/Modules/user/dto/UserBaseResponseDto';
import { WarehouseBaseResponseDto } from 'src/Modules/warehouse/dto/WarehouseBaseResponseDto';

export class DivisionBaseResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  location: string;

  @ApiProperty({
    type: () => WarehouseBaseResponseDto,
  })
  warehouse: WarehouseBaseResponseDto;

  @ApiProperty({
    type: () => UserBaseResponseDto,
  })
  users: UserBaseResponseDto[];

  // Описать как DTO
  @ApiProperty({
    type: () => Kabinet,
  })
  kabinet: Kabinet[];

  // Описать как DTO
  @ApiProperty({
    type: () => Delivery,
  })
  delivery: Delivery[];

  @ApiProperty({
    type: () => UserBaseResponseDto,
  })
  creator: UserBaseResponseDto;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
