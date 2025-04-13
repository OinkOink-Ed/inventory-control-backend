import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiRequestTimeoutResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CartridgeModelService } from './cartridgeModel.service';
import { ErrorResponseDto } from 'src/common/dto/ErrorResponseDto';
import { SuccessResponse } from 'src/common/dto/SuccessResponseDto';
import { RequestCreateCartridgeModelDto } from 'src/Modules/cartridgeModel/dto/RequestCreateCartridgeModelDto';
import { ResponseGetAllCartridgeModelDto } from 'src/Modules/cartridgeModel/dto/ResponseGetAllCartridgeModelDto';
import { ResponseGetAllDetailedCartridgeModelDto } from 'src/Modules/cartridgeModel/dto/ResponseGetAllDetailedCartridgeModelDto';

@ApiTags('CartridgeModel')
@Controller('cartridgeModel')
export class CartridgeModelController {
  constructor(private readonly createModelCartridge: CartridgeModelService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Картриджи успешно добавлены',
    type: () => SuccessResponse,
  })
  @ApiBadRequestResponse({
    description:
      'Неверный формат данных, дубликат записи или отсутствие связанно записи',
    type: () => ErrorResponseDto,
  })
  @ApiForbiddenResponse({
    description: 'Доступ запрещен',
    type: () => ErrorResponseDto,
  })
  @ApiRequestTimeoutResponse({
    description: 'Превышено время ожидания',
    type: () => ErrorResponseDto,
  })
  async create(
    @Body() createDto: RequestCreateCartridgeModelDto,
  ): Promise<SuccessResponse | ErrorResponseDto> {
    await this.createModelCartridge.create(createDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Модель картриджа успешно добавлена',
    };
  }

  @Get('detailed')
  @ApiCreatedResponse({
    type: () => ResponseGetAllDetailedCartridgeModelDto,
    isArray: true,
  })
  @ApiBadRequestResponse({
    type: () => ErrorResponseDto,
  })
  @ApiRequestTimeoutResponse({
    type: () => ErrorResponseDto,
  })
  @ApiForbiddenResponse({
    type: () => ErrorResponseDto,
  })
  @ApiNotFoundResponse({
    type: () => ErrorResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  async getAllDetailed(): Promise<ResponseGetAllDetailedCartridgeModelDto[]> {
    return await this.createModelCartridge.getAllDetailed();
  }

  @Get()
  @ApiCreatedResponse({
    type: () => ResponseGetAllCartridgeModelDto,
    isArray: true,
  })
  @ApiBadRequestResponse({
    type: () => ErrorResponseDto,
  })
  @ApiRequestTimeoutResponse({
    type: () => ErrorResponseDto,
  })
  @ApiForbiddenResponse({
    type: () => ErrorResponseDto,
  })
  @ApiNotFoundResponse({
    type: () => ErrorResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<ResponseGetAllCartridgeModelDto[]> {
    return await this.createModelCartridge.getAll();
  }
}
