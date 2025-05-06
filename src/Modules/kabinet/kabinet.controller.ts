import { ApiErrorResponses } from '@common/decorators/ApiErrorResponse';
import { SuccessResponseDto } from '@common/dto/SuccessResponseDto';
import { GetResponseKabinetsDto } from '@Modules/kabinet/dto/GetResponseKabinetsDto';
import { PostCreateKabinetDto } from '@Modules/kabinet/dto/PostCreateKabinetDto';
import { KabinetService } from '@Modules/kabinet/kabinet.service';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Kabinets')
@Controller('kabinets')
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

  @Get(':divisionId')
  @ApiBearerAuth()
  @ApiOkResponse({
    type: () => GetResponseKabinetsDto,
    isArray: true,
  })
  @ApiErrorResponses()
  async getKAbinetsByDivisionId(
    @Param('divisionId', ParseIntPipe) divisionId: number,
  ): Promise<GetResponseKabinetsDto[]> {
    return await this.kabinetService.getKAbinetsByDivisionId(divisionId);
  }
}
