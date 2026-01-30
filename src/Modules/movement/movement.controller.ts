import { ApiErrorResponses } from '@common/decorators/ApiErrorResponse';
import { Roles } from '@common/decorators/Roles';
import { User } from '@common/decorators/User';
import { SuccessResponseDto } from '@common/dto/SuccessResponseDto';
import { CartridgeStatus } from '@common/enums/CartridgeStatus';
import { RoleGuard } from '@common/guards/RoleGuard';
import { PostCreateMovementDto } from '@Modules/movement/dto/PostCreateMovementDto';
import { MovementService } from '@Modules/movement/movement.service';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';

@Controller('movement')
@UseGuards(RoleGuard)
export class MovementController {
  constructor(private readonly movementService: MovementService) {}

  @Roles('admin')
  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Картриджи успешно перемещены',
    type: () => SuccessResponseDto,
  })
  @ApiErrorResponses()
  async create(
    @Body() createDto: PostCreateMovementDto,
    @User() userData: { sub: { id: number } },
  ): Promise<SuccessResponseDto> {
    createDto.creator = { id: userData.sub.id };
    createDto.state = CartridgeStatus.MOVED;
    return await this.movementService.create(createDto);
  }
}
