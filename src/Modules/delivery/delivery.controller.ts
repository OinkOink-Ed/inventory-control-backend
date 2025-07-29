import { ApiErrorResponses } from '@common/decorators/ApiErrorResponse';
import { User } from '@common/decorators/User';
import { SuccessResponseDto } from '@common/dto/SuccessResponseDto';
import { CartridgeStatus } from '@common/enums/CartridgeStatus';
import { DeliveryService } from '@Modules/delivery/delivery.service';
import { PostCreateDeliveryDto } from '@Modules/delivery/dto/PostCreateDeliveryDto';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';
import { GetDeliveryByWarehouseIdDto } from './dto/GetDeliveryByWarehouseIdDto';
import { GetResponseDetailedStaffByIdDto } from './dto/GetResponseDetailedStaffByIdDto';

@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Картриджи успешно выданы',
    type: () => SuccessResponseDto,
  })
  @ApiErrorResponses()
  async create(
    @Body() createDto: PostCreateDeliveryDto,
    @User() userData: { sub: { id: number } },
  ): Promise<SuccessResponseDto> {
    createDto.creator = { id: userData.sub.id };
    createDto.state = CartridgeStatus.ISSUED;
    return await this.deliveryService.create(createDto);
  }

  @Get('detailed/:warehouseId')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: () => GetDeliveryByWarehouseIdDto,
  })
  @ApiErrorResponses()
  //Нужны новые параметры - дата + модель, передавать в сервис и сделать запрос к БД исходя из переданных значений
  async getDetailedByWarehouseId(
    @Param('warehouseId') warehouseId: number,
  ): Promise<GetDeliveryByWarehouseIdDto[]> {
    return await this.deliveryService.getDetailedByWarehouseId(warehouseId);
  }

  @Get('detailed/:staffId')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: () => GetResponseDetailedStaffByIdDto,
    isArray: true,
  })
  @ApiErrorResponses()
  async getDeteiledById(
    @Param('staffId', ParseIntPipe) staffId: number,
  ): Promise<GetResponseDetailedStaffByIdDto[]> {
    return await this.deliveryService.getDeliveryByStaffId(staffId);
  }
}
