import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiRequestTimeoutResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateWarehouseDto } from './dto/CreateWarehouseDto';
import {
  ReadWarehouseDetailedDto,
  ReadWarehouseDto,
} from './dto/ReadWarehouseDto';
import { SuccessResponse } from 'src/common/dto/SuccessResponseDto';
import { ErrorResponseDto } from 'src/common/dto/ErrorResponseDto';

@ApiTags('Warehouse')
@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly createModelCartridge: WarehouseService) {}

  @Post()
  @ApiCreatedResponse({
    type: () => SuccessResponse,
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
  async create(
    @Body() createDto: CreateWarehouseDto,
  ): Promise<SuccessResponse | ErrorResponseDto> {
    await this.createModelCartridge.create(createDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Модель картриджа успешно добавлена',
    };
  }

  @Get('detailed')
  @ApiCreatedResponse({
    type: () => ReadWarehouseDetailedDto,
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
  async getAllDetailed(): Promise<ReadWarehouseDetailedDto[]> {
    return await this.createModelCartridge.getAllDetailed();
  }

  @Get()
  @ApiCreatedResponse({
    type: () => ReadWarehouseDto,
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
  async getAll(): Promise<ReadWarehouseDto[]> {
    return await this.createModelCartridge.getAll();
  }
}
