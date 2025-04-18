import { PickType } from '@nestjs/mapped-types';
import { WarehouseBaseResponseDto } from './WarehouseBaseResponseDto';
import { ResponseWithGetAllDetailedWarehouseDto } from 'src/Modules/user/dto/ResponseWithGetAllDetailedWarehouseDto';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseGetAllDetailedWarehouseDto extends PickType(
  WarehouseBaseResponseDto,
  ['id', 'name'],
) {
  @ApiProperty({
    type: () => ResponseWithGetAllDetailedWarehouseDto,
  })
  creator: ResponseWithGetAllDetailedWarehouseDto;
}
