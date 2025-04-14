import { PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsObject, ValidateNested } from 'class-validator';
import { CartridgeModelBaseDto } from 'src/Modules/cartridgeModel/dto/CartridgeModelBaseDto';
import { ResponseUserWithGetAllDetailedCartridgeModelDto } from 'src/Modules/user/dto/ResponseUserWithGetAllDetailedCartridgeModelDto';

export class ResponseGetAllDetailedCartridgeModelDto extends PickType(
  CartridgeModelBaseDto,
  ['id', 'name'],
) {
  @ApiProperty({
    type: () => ResponseUserWithGetAllDetailedCartridgeModelDto,
  })
  @IsObject()
  @ValidateNested()
  @Type(() => ResponseUserWithGetAllDetailedCartridgeModelDto)
  creator: ResponseUserWithGetAllDetailedCartridgeModelDto;
}
