import { PickType } from '@nestjs/mapped-types';
import { CartridgeModelBaseResponseDto } from './CartridgeModelBaseResponseDto';
import { ResponseUserWithGetAllDetailedCartridgeModelDto } from 'src/Modules/user/dto/ResponseWithGetAllDetailedCartridgeModelDto';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseGetAllDetailedCartridgeModelDto extends PickType(
  CartridgeModelBaseResponseDto,
  ['id', 'name'],
) {
  @ApiProperty({
    type: () => ResponseUserWithGetAllDetailedCartridgeModelDto,
  })
  creator: ResponseUserWithGetAllDetailedCartridgeModelDto;
}
