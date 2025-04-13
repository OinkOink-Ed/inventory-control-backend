import { PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CartridgeModelBaseDto } from 'src/Modules/cartridgeModel/dto/CartridgeModelBaseDto';
import { ResponseUserWithGetAllDetailedCartridgeModelDto } from 'src/Modules/user/dto/ResponseUserWithGetAllDetailedCartridgeModelDto';

export class ResponseGetAllDetailedCartridgeModelDto extends PickType(
  CartridgeModelBaseDto,
  ['id', 'name'],
) {
  @ApiProperty({
    type: () => ResponseUserWithGetAllDetailedCartridgeModelDto,
  })
  creator: ResponseUserWithGetAllDetailedCartridgeModelDto;
}
