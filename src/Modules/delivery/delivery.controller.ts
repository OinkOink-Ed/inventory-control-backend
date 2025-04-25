import { ApiErrorResponses } from '@common/decorators/ApiErrorResponse';
import { SuccessResponseDto } from '@common/dto/SuccessResponseDto';
import { DeliveryService } from '@Modules/delivery/delivery.service';
import { PostCreateDeliveryDto } from '@Modules/delivery/dto/PostCreateDeliveryDto';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';

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
  ): Promise<SuccessResponseDto> {
    return await this.deliveryService.create(createDto);
  }
}
