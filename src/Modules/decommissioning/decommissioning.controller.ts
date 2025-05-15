import { ApiErrorResponses } from '@common/decorators/ApiErrorResponse';
import { User } from '@common/decorators/User';
import { SuccessResponseDto } from '@common/dto/SuccessResponseDto';
import { CartridgeStatus } from '@common/enums/CartridgeStatus';
import { DecommissioningService } from '@Modules/decommissioning/decommissioning.service';
import { PostCreateDecommissioningDto } from '@Modules/decommissioning/dto/PostCreateDecommissioningDto';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';

@Controller('decommissioning')
export class DecommissioningController {
  constructor(
    private readonly decommissioningService: DecommissioningService,
  ) {}

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Картриджи успешно списаны',
    type: () => SuccessResponseDto,
  })
  @ApiErrorResponses()
  async create(
    @Body() createDto: PostCreateDecommissioningDto,
    @User() userData: { sub: { id: number } },
  ): Promise<SuccessResponseDto> {
    createDto.creator = { id: userData.sub.id };
    createDto.state = CartridgeStatus.DECOMMISSIONED;
    return await this.decommissioningService.create(createDto);
  }
}
