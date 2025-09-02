import { ApiErrorResponses } from '@common/decorators/ApiErrorResponse';
import { Roles } from '@common/decorators/Roles';
import { UserData } from '@common/decorators/types/UserType';
import { User } from '@common/decorators/User';
import { SuccessResponseDto } from '@common/dto/SuccessResponseDto';
import { CartridgeStatus } from '@common/enums/CartridgeStatus';
import { RoleGuard } from '@common/guards/RoleGuard';
import { DecommissioningService } from '@Modules/decommissioning/decommissioning.service';
import { PostCreateDecommissioningDto } from '@Modules/decommissioning/dto/PostCreateDecommissioningDto';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';

@Controller('decommissioning')
@UseGuards(RoleGuard)
export class DecommissioningController {
  constructor(
    private readonly decommissioningService: DecommissioningService,
  ) {}

  @Post()
  @Roles('admin', 'user')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Картриджи успешно списаны',
    type: () => SuccessResponseDto,
  })
  @ApiErrorResponses()
  async create(
    @Body() createDto: PostCreateDecommissioningDto,
    @User('sub') userData: UserData,
  ): Promise<SuccessResponseDto> {
    createDto.creator = { id: userData.id };
    createDto.state = CartridgeStatus.DECOMMISSIONED;
    return await this.decommissioningService.create(createDto);
  }
}
