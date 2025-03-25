// import {
//   Body,
//   Controller,
//   Get,
//   HttpCode,
//   HttpStatus,
//   Post,
// } from '@nestjs/common';
// import {
//   ApiBadRequestResponse,
//   ApiCreatedResponse,
//   ApiForbiddenResponse,
//   ApiNotFoundResponse,
//   ApiRequestTimeoutResponse,
//   ApiTags,
// } from '@nestjs/swagger';
// import { ModelCartridgesService } from './model-cartridges.service';
// import {
//   ErrorResponse400,
//   ErrorResponse403,
//   ErrorResponse404,
//   ErrorResponse408,
// } from 'src/common/errorTypes';
// import {
//   CreateModelCartridgeDto,
//   ModelCartridgeResponse,
// } from './dto/CreateModelCartridgeDto';
// import { SuccessResponse200 } from 'src/common/successTypes';

// @ApiTags('ModelCartridges')
// @Controller('model-cartridges')
// export class ModelCartridgesController {
//   constructor(private readonly createModelCartridge: ModelCartridgesService) { }

//   @Post()
//   @ApiCreatedResponse({
//     type: () => SuccessResponse200,
//   })
//   @ApiBadRequestResponse({
//     type: () => ErrorResponse400,
//   })
//   @ApiRequestTimeoutResponse({
//     type: () => ErrorResponse408,
//   })
//   @ApiForbiddenResponse({
//     type: () => ErrorResponse403,
//   })
//   @ApiNotFoundResponse({
//     type: () => ErrorResponse404,
//   })
//   @HttpCode(HttpStatus.OK)
//   async create(
//     @Body() createDto: CreateModelCartridgeDto,
//   ): Promise<
//     | SuccessResponse200
//     | ErrorResponse400
//     | ErrorResponse408
//     | ErrorResponse403
//     | ErrorResponse404
//   > {
//     await this.createModelCartridge.create(createDto);
//     return {
//       statusCode: 200,
//       message: 'Модель картриджа успешно добавлена',
//     };
//   }

//   @Get()
//   @ApiCreatedResponse({
//     type: () => ModelCartridgeResponse,
//     isArray: true,
//   })
//   @ApiBadRequestResponse({
//     type: () => ErrorResponse400,
//   })
//   @ApiRequestTimeoutResponse({
//     type: () => ErrorResponse408,
//   })
//   @ApiForbiddenResponse({
//     type: () => ErrorResponse403,
//   })
//   @ApiNotFoundResponse({
//     type: () => ErrorResponse404,
//   })
//   @HttpCode(HttpStatus.OK)
//   async getAll(): Promise<CreateModelCartridgeDto[]> {
//     return await this.createModelCartridge.getAll();
//   }
// }
