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
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiRequestTimeoutResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CartridgeModelService } from './cartridgeModel.service';
import { ErrorResponseDto } from 'src/common/dto/ErrorResponseDto';
import { SuccessResponse } from 'src/common/dto/SuccessResponseDto';
import { RequestCreateModelCartridgeDto } from './dto/RequestCreateModelCartridgeDto';
import { ResponseGetAllCartridgeModelDto } from './dto/ResponseGetAllCartridgeModelDto';
import { ResponseUserWithGetAllDetailedCartridgeModelDto } from '../user/dto/ResponseWithGetAllDetailedCartridgeModelDto';
import { ResponseGetAllDetailedCartridgeModelDto } from './dto/ResponseGetAllDetailedCartridgeModelDto';

@ApiTags('CartridgeModel')
@Controller('cartridgeModel')
export class CartridgeModelController {
  constructor(private readonly createModelCartridge: CartridgeModelService) {}

  @Post()
  @ApiBearerAuth()
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
    @Body() createDto: RequestCreateModelCartridgeDto,
  ): Promise<SuccessResponse | ErrorResponseDto> {
    return await this.createModelCartridge.create(createDto);
  }

  @Get('detailed')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: () => ResponseUserWithGetAllDetailedCartridgeModelDto,
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
  async getAllDetailed(): Promise<
    ResponseGetAllDetailedCartridgeModelDto[] | ErrorResponseDto
  > {
    return await this.createModelCartridge.getAllDetailed();
  }

  @Get()
  @ApiBearerAuth()
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
  async getAll(): Promise<
    ResponseGetAllCartridgeModelDto[] | ErrorResponseDto
  > {
    return await this.createModelCartridge.getAll();
  }
}
