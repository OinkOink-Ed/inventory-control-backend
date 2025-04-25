import { ApiErrorResponses } from '@common/decorators/ApiErrorResponse';
import { SuccessResponseDto } from '@common/dto/SuccessResponseDto';
import { GetResponseAllKabinetDto } from '@Modules/kabinet/dto/GetResponseAllKabinetDto';
import { PostCreateKabinetDto } from '@Modules/kabinet/dto/PostCreateKabinetDto';
import { KabinetService } from '@Modules/kabinet/kabinet.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Kabinet')
@Controller('kabinet')
export class KabinetController {
  constructor(private readonly kabinetService: KabinetService) {}

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: () => SuccessResponseDto,
  })
  @ApiErrorResponses()
  async create(
    @Body() createDto: PostCreateKabinetDto,
  ): Promise<SuccessResponseDto> {
    return await this.kabinetService.create(createDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({
    type: () => GetResponseAllKabinetDto,
    isArray: true,
  })
  @ApiErrorResponses()
  async getAll(): Promise<GetResponseAllKabinetDto[]> {
    return await this.kabinetService.getAll();
  }
}
