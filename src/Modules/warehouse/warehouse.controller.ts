import { ApiErrorResponses } from '@common/decorators/ApiErrorResponse';
import { User } from '@common/decorators/User';
import { SuccessResponseDto } from '@common/dto/SuccessResponseDto';
import { GetResponseAllDetailedWarehouseDto } from '@Modules/warehouse/dto/GetResponseAllDetailedWarehouseDto';
import { GetResponseAllWarehouseDto } from '@Modules/warehouse/dto/GetResponseAllWarehouseDto';
import { PostCreateWarehouseDto } from '@Modules/warehouse/dto/PostCreateWarehouseDto';
import { WarehouseService } from '@Modules/warehouse/warehouse.service';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Warehouse')
@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: () => SuccessResponseDto,
  })
  @ApiErrorResponses()
  async create(
    @Body() createDto: PostCreateWarehouseDto,
    @User() userData: { sub: { id: number } },
  ): Promise<SuccessResponseDto> {
    createDto.creator = { id: userData.sub.id };
    return await this.warehouseService.create(createDto);
  }

  @Get('detailed/:warehouseId')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: () => GetResponseAllDetailedWarehouseDto,
  })
  @ApiErrorResponses()
  async getDetailedByWarehouseId(
    @Param('warehouseId', ParseIntPipe) warehouseId: number,
  ): Promise<GetResponseAllDetailedWarehouseDto[]> {
    return await this.warehouseService.getDetailedByWarehouseId(warehouseId);
  }

  @Get()
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: () => GetResponseAllWarehouseDto,
    isArray: true,
  })
  @ApiErrorResponses()
  async getAll(): Promise<GetResponseAllWarehouseDto[]> {
    return await this.warehouseService.getAll();
  }
}
