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
import { SuccessResponse } from 'src/common/dto/SuccessResponseDto';
import { ErrorResponseDto } from 'src/common/dto/ErrorResponseDto';
import { WarehouseBaseResponseDto } from './dto/WarehouseBaseResponseDto';
import { WarehouseBaseRequestDto } from './dto/WarehouseBaseRequestDto';

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
    @Body() createDto: WarehouseBaseRequestDto,
  ): Promise<SuccessResponse | ErrorResponseDto> {
    await this.createModelCartridge.create(createDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Модель картриджа успешно добавлена',
    };
  }

  @Get('detailed')
  @ApiCreatedResponse({
    type: () => WarehouseBaseResponseDto,
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
  async getAllDetailed(): Promise<WarehouseBaseResponseDto[]> {
    return await this.createModelCartridge.getAllDetailed();
  }

  @Get()
  @ApiCreatedResponse({
    type: () => WarehouseBaseResponseDto,
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
  async getAll(): Promise<WarehouseBaseResponseDto[]> {
    return await this.createModelCartridge.getAll();
  }
}
