import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiRequestTimeoutResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SuccessResponse200 } from 'src/common/successTypes';
import {
  ErrorResponse400,
  ErrorResponse403,
  ErrorResponse404,
  ErrorResponse408,
} from 'src/common/errorTypes';
import { CreateWarehouseDto } from './dto/CreateWarehouseDto';
import {
  ReadWarehouseDetailedDto,
  ReadWarehouseDto,
} from './dto/ReadWarehouseDto';

@ApiTags('Warehouse')
@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly createModelCartridge: WarehouseService) {}

  @Post()
  @ApiCreatedResponse({
    type: () => SuccessResponse200,
  })
  @ApiBadRequestResponse({
    type: () => ErrorResponse400,
  })
  @ApiRequestTimeoutResponse({
    type: () => ErrorResponse408,
  })
  @ApiForbiddenResponse({
    type: () => ErrorResponse403,
  })
  @ApiNotFoundResponse({
    type: () => ErrorResponse404,
  })
  @HttpCode(HttpStatus.OK)
  async create(
    @Body() createDto: CreateWarehouseDto,
  ): Promise<
    | SuccessResponse200
    | ErrorResponse400
    | ErrorResponse408
    | ErrorResponse403
    | ErrorResponse404
  > {
    await this.createModelCartridge.create(createDto);
    return {
      statusCode: 200,
      message: 'Модель картриджа успешно добавлена',
    };
  }

  @Get('detailed')
  @ApiCreatedResponse({
    type: () => ReadWarehouseDetailedDto,
    isArray: true,
  })
  @ApiBadRequestResponse({
    type: () => ErrorResponse400,
  })
  @ApiRequestTimeoutResponse({
    type: () => ErrorResponse408,
  })
  @ApiForbiddenResponse({
    type: () => ErrorResponse403,
  })
  @ApiNotFoundResponse({
    type: () => ErrorResponse404,
  })
  @HttpCode(HttpStatus.OK)
  async getAllDetailed(): Promise<ReadWarehouseDetailedDto[]> {
    return await this.createModelCartridge.getAllDetailed();
  }

  @Get()
  @ApiCreatedResponse({
    type: () => ReadWarehouseDto,
    isArray: true,
  })
  @ApiBadRequestResponse({
    type: () => ErrorResponse400,
  })
  @ApiRequestTimeoutResponse({
    type: () => ErrorResponse408,
  })
  @ApiForbiddenResponse({
    type: () => ErrorResponse403,
  })
  @ApiNotFoundResponse({
    type: () => ErrorResponse404,
  })
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<ReadWarehouseDto[]> {
    return await this.createModelCartridge.getAll();
  }
}
