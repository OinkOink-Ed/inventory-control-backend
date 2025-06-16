import { ApiErrorResponses } from '@common/decorators/ApiErrorResponse';
import { User } from '@common/decorators/User';
import { SuccessResponseDto } from '@common/dto/SuccessResponseDto';
import { GetResponseKabinetsDto } from '@Modules/kabinet/dto/GetResponseKabinetsDto';
import { PostCreateKabinetDto } from '@Modules/kabinet/dto/PostCreateKabinetDto';
import { KabinetService } from '@Modules/kabinet/kabinet.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  SerializeOptions,
  UseInterceptors,
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
    @User() userData: { sub: { id: number } },
  ): Promise<SuccessResponseDto> {
    createDto.creator = { id: userData.sub.id };
    return await this.kabinetService.create(createDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    type: GetResponseKabinetsDto,
    excludeExtraneousValues: true,
  })
  @Get(':divisionId')
  @ApiBearerAuth()
  @ApiOkResponse({
    type: () => GetResponseKabinetsDto,
    isArray: true,
  })
  @ApiErrorResponses()
  async getKAbinetsByDivisionId(
    @Param('divisionId') divisionId: number,
  ): Promise<GetResponseKabinetsDto[]> {
    return await this.kabinetService.getKAbinetsByDivisionId(divisionId);
  }
}
