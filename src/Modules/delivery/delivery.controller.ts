import { ApiErrorResponses } from '@common/decorators/ApiErrorResponse';
import { User } from '@common/decorators/User';
import { SuccessResponseDto } from '@common/dto/SuccessResponseDto';
import { CartridgeStatus } from '@common/enums/CartridgeStatus';
import { DeliveryService } from '@Modules/delivery/delivery.service';
import { PostCreateDeliveryDto } from '@Modules/delivery/dto/PostCreateDeliveryDto';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';
import { GetDeliveryByWarehouseIdDto } from './dto/GetDeliveryByWarehouseIdDto';
import { UserData } from '@common/decorators/types/UserType';
import { RoleGuard } from '@common/guards/RoleGuard';
import { Roles } from '@common/decorators/Roles';

@Controller('delivery')
@UseGuards(RoleGuard)
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Post()
  @Roles('admin', 'user')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Картриджи успешно выданы',
    type: () => SuccessResponseDto,
  })
  @ApiErrorResponses()
  async create(
    @Body() createDto: PostCreateDeliveryDto,
    @User('sub') userData: UserData,
  ): Promise<SuccessResponseDto> {
    createDto.creator = { id: userData.id };
    createDto.state = CartridgeStatus.ISSUED;
    return await this.deliveryService.create(createDto, userData);
  }

  @Get('detailed/:warehouseId')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: () => GetDeliveryByWarehouseIdDto,
  })
  @ApiErrorResponses()
  //Нужны новые параметры - дата + модель, передавать в сервис и сделать запрос к БД исходя из переданных значений
  async getIssuedByWarehouse(
    @Param('warehouseId') warehouseId: number,
  ): Promise<GetDeliveryByWarehouseIdDto[]> {
    return await this.deliveryService.getIssuedByWarehouse(warehouseId);
  }
}
