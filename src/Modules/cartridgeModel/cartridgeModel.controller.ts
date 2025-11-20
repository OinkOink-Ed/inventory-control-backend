import { ApiErrorResponses } from '@common/decorators/ApiErrorResponse';
import { Roles } from '@common/decorators/Roles';
import { User } from '@common/decorators/User';
import { SuccessResponseDto } from '@common/dto/SuccessResponseDto';
import { RoleGuard } from '@common/guards/RoleGuard';
import { CartridgeModelService } from '@Modules/cartridgeModel/cartridgeModel.service';
import { GetResponseAllCartridgeModelDto } from '@Modules/cartridgeModel/dto/GetResponseAllCartridgeModelDto';
import { GetResponseAllDetailedCartridgeModelDto } from '@Modules/cartridgeModel/dto/GetResponseAllDetailedCartridgeModelDto';
import { PostCreateCartridgeModelDto } from '@Modules/cartridgeModel/dto/PostCreateCartridgeModelDto';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('CartridgeModel')
@Controller('cartridgeModel')
@UseGuards(RoleGuard)
export class CartridgeModelController {
  constructor(private readonly createModelCartridge: CartridgeModelService) {}

  @Roles('admin')
  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Модели Картриджей успешно добавлены',
    type: () => SuccessResponseDto,
  })
  @ApiErrorResponses()
  async create(
    @Body() createDto: PostCreateCartridgeModelDto,
    @User() userData: { sub: { id: number } },
  ): Promise<SuccessResponseDto> {
    createDto.creator = { id: userData.sub.id };
    return await this.createModelCartridge.create(createDto);
  }

  @Roles('admin')
  @Get('detailed')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: () => GetResponseAllDetailedCartridgeModelDto,
    isArray: true,
  })
  @ApiErrorResponses()
  @HttpCode(HttpStatus.OK)
  async getModelsAndTheirCreator(): Promise<
    GetResponseAllDetailedCartridgeModelDto[]
  > {
    return await this.createModelCartridge.getModelsAndTheirCreator();
  }

  @Roles('admin', 'user')
  @Get('/:warehouseId')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: () => GetResponseAllCartridgeModelDto,
    isArray: true,
  })
  @ApiErrorResponses()
  @HttpCode(HttpStatus.OK)
  async getMogetModelsByWarehousedels(
    @Param('warehouseId', ParseIntPipe) warehouseId: number,
  ): Promise<GetResponseAllCartridgeModelDto[]> {
    return await this.createModelCartridge.getModelsByWarehouse(warehouseId);
  }

  @Roles('admin', 'user')
  @Get()
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: () => GetResponseAllCartridgeModelDto,
    isArray: true,
  })
  @ApiErrorResponses()
  @HttpCode(HttpStatus.OK)
  async getModels(): Promise<GetResponseAllCartridgeModelDto[]> {
    return await this.createModelCartridge.getModels();
  }
}
