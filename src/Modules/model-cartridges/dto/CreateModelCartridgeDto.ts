// import { ApiProperty } from '@nestjs/swagger';
// import { Type } from 'class-transformer';
// import {
//   IsNotEmpty,
//   IsNotEmptyObject,
//   IsString,
//   ValidateNested,
// } from 'class-validator';
// import {
//   UserResponseWithModelsCartridgesDto,
//   UserWhenCreatemodelDto,
// } from 'src/Modules/users/dto/createUserDto';

// export class CreateModelCartridgeDto {
//   @ApiProperty()
//   @IsNotEmpty()
//   @IsString()
//   modelName: string;

//   @ApiProperty()
//   @IsNotEmpty()
//   @IsString()
//   printerName: string;

//   @ApiProperty({
//     type: () => UserWhenCreatemodelDto,
//   })
//   @ValidateNested()
//   @IsNotEmptyObject()
//   @Type(() => UserWhenCreatemodelDto)
//   creator: UserWhenCreatemodelDto;
// }

// export class ModelCartridgeResponse {
//   @ApiProperty({
//     type: () => UserResponseWithModelsCartridgesDto,
//   })
//   creator: UserResponseWithModelsCartridgesDto;

//   @ApiProperty()
//   id: number;

//   @ApiProperty()
//   printerName: string;

//   @ApiProperty()
//   modelName: string;
//   @ApiProperty()
//   createdAt: string;
//   @ApiProperty()
//   updatedAt: string;
// }
