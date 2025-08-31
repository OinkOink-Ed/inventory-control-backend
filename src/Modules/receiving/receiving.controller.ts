import { ApiErrorResponses } from '@common/decorators/ApiErrorResponse';
import { Roles } from '@common/decorators/Roles';
import { User } from '@common/decorators/User';
import { SuccessResponseDto } from '@common/dto/SuccessResponseDto';
import { CartridgeStatus } from '@common/enums/CartridgeStatus';
import { RoleGuard } from '@common/guards/RoleGuard';
import { PostCreateReceivingDto } from '@Modules/receiving/dto/PostCreateReceivingDto';
import { ReceivingService } from '@Modules/receiving/receiving.service';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';

@Controller('receiving')
@UseGuards(RoleGuard)
export class ReceivingController {
  constructor(private readonly receivingService: ReceivingService) {}

  @Roles('admin')
  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Картриджи успешно приняты',
    type: () => SuccessResponseDto,
  })
  @ApiErrorResponses()
  async create(
    @Body() createDto: PostCreateReceivingDto,
    @User() userData: { sub: { id: number } },
  ): Promise<SuccessResponseDto> {
    createDto.creator = { id: userData.sub.id };
    createDto.state = CartridgeStatus.RECEIVED;
    return await this.receivingService.create(createDto);
  }
}
