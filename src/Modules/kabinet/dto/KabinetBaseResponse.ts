import { ApiProperty } from '@nestjs/swagger';
import { Delivery } from 'src/Modules/delivery/entities/Delivery';
import { DivisionBaseResponseDto } from 'src/Modules/division/dto/DivisionBaseResponseDto';
import { UserBaseResponseDto } from 'src/Modules/user/dto/UserBaseResponseDto';

export class KabinetBaseResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  number: string;

  //нужен DTO
  @ApiProperty({
    type: () => Delivery,
  })
  delivery: Delivery[];

  @ApiProperty({
    type: () => DivisionBaseResponseDto,
  })
  division: DivisionBaseResponseDto;

  @ApiProperty({
    type: () => UserBaseResponseDto,
  })
  creator: UserBaseResponseDto;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
