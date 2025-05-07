import { ApiErrorResponses } from '@common/decorators/ApiErrorResponse';
import { User } from '@common/decorators/User';
import { SuccessResponseDto } from '@common/dto/SuccessResponseDto';
import { PostCreateReceivingDto } from '@Modules/receiving/dto/PostCreateReceivingDto';
import { ReceivingService } from '@Modules/receiving/receiving.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';

@Controller('receiving')
export class ReceivingController {
  constructor(private readonly receivingService: ReceivingService) {}

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Картриджи успешно приняты',
    type: () => SuccessResponseDto,
  })
  @ApiErrorResponses()
  async create(
    @Body() createDto: PostCreateReceivingDto,
    @User() userDto: { id: number },
  ): Promise<SuccessResponseDto> {
    createDto.creator = userDto;
    return await this.receivingService.create(createDto);
  }
}
