import { ApiErrorResponses } from '@common/decorators/ApiErrorResponse';
import { User } from '@common/decorators/User';
import { SuccessResponseDto } from '@common/dto/SuccessResponseDto';
import { CartridgeStatus } from '@common/enums/CartridgeStatus';
import { DeliveryService } from '@Modules/delivery/delivery.service';
import { PostCreateDeliveryDto } from '@Modules/delivery/dto/PostCreateDeliveryDto';
import {
  Body,
  // ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  // SerializeOptions,
  // UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';
import { GetDeliveryByWarehouseIdDto } from './dto/GetDeliveryByWarehouseIdDto';

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

  // @UseInterceptors(ClassSerializerInterceptor)
  // @SerializeOptions({
  //   type: GetDeliveryByWarehouseIdDto,
  //   excludeExtraneousValues: true,
  // })
  @Get('detailed/:warehouseId')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: () => GetDeliveryByWarehouseIdDto,
  })
  @ApiErrorResponses()
  async getDetailedByWarehouseId(
    @Param('warehouseId') warehouseId: number,
  ): Promise<GetDeliveryByWarehouseIdDto[] | void> {
    return await this.deliveryService.getDetailedByWarehouseId(warehouseId);
  }
}
