import { ApiErrorResponses } from '@common/decorators/ApiErrorResponse';
import { SuccessResponseDto } from '@common/dto/SuccessResponseDto';
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
  ): Promise<SuccessResponseDto> {
    return await this.decommissioningService.create(createDto);
  }
}
