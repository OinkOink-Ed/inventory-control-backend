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
import { SuccessResponseDto } from 'src/common/dto/SuccessResponseDto';
import { PostCreateCartridgeModelDto } from './dto/PostCreateCartridgeModelDto';
import { GetResponseAllDetailedCartridgeModelDto } from './dto/GetResponseAllDetailedCartridgeModelDto';
import { GetResponseAllCartridgeModelDto } from './dto/GetResponseAllCartridgeModelDto';

@ApiTags('CartridgeModel')
@Controller('cartridgeModel')
export class CartridgeModelController {
  constructor(private readonly createModelCartridge: CartridgeModelService) {}

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Картриджи успешно добавлены',
    type: () => SuccessResponseDto,
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
    @Body() createDto: PostCreateCartridgeModelDto,
  ): Promise<SuccessResponseDto> {
    return await this.createModelCartridge.create(createDto);
  }

  @Get('detailed')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: () => GetResponseAllDetailedCartridgeModelDto,
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
  async getAllDetailed(): Promise<GetResponseAllDetailedCartridgeModelDto[]> {
    return await this.createModelCartridge.getAllDetailed();
  }

  @Get()
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: () => GetResponseAllCartridgeModelDto,
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
  async getAll(): Promise<GetResponseAllCartridgeModelDto[]> {
    return await this.createModelCartridge.getAll();
  }
}
