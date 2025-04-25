import { ApiErrorResponses } from '@common/decorators/ApiErrorResponse';
import { SuccessResponseDto } from '@common/dto/SuccessResponseDto';
import { PostCreateMovementDto } from '@Modules/movement/dto/PostCreateMovementDto';
import { MovementService } from '@Modules/movement/movement.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';

@Controller('movement')
export class MovementController {
  constructor(private readonly movementService: MovementService) {}

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Картриджи успешно перемещены',
    type: () => SuccessResponseDto,
  })
  @ApiErrorResponses()
  async create(
    @Body() createDto: PostCreateMovementDto,
  ): Promise<SuccessResponseDto> {
    return await this.movementService.create(createDto);
  }
}
