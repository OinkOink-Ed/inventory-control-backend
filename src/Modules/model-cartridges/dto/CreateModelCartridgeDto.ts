import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmptyObject, IsString, ValidateNested } from 'class-validator';
import { UserWhenCreatemodelDto } from 'src/Modules/users/dto/createUserDto';

export class CreateModelCartridgeDto {
  @ApiProperty()
  @IsString()
  modelName: string;

  @ApiProperty({
    type: () => UserWhenCreatemodelDto,
  })
  @ValidateNested()
  @IsNotEmptyObject()
  @Type(() => UserWhenCreatemodelDto)
  creator: UserWhenCreatemodelDto;
}
