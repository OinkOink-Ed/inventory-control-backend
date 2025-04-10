import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiRequestTimeoutResponse,
  ApiTags,
} from '@nestjs/swagger';
import { KabinetService } from './kabinet.service';
import { CreateKabinetDto } from './dto/CreateKabinetDto';
import { ReadKabinetDto } from './dto/ReadKabinetDto';
import { SuccessResponse } from 'src/common/dto/SuccessResponseDto';
import { ErrorResponseDto } from 'src/common/dto/ErrorResponseDto';

@ApiTags('Kabinet')
@Controller('kabinet')
export class KabinetController {
  constructor(private readonly kabinetService: KabinetService) {}

  @Post()
  @ApiCreatedResponse({
    type: () => SuccessResponse,
  })
  @ApiBadRequestResponse({
    type: () => ErrorResponseDto,
  })
  @ApiRequestTimeoutResponse({
    type: () => ErrorResponseDto,
  })
  @ApiForbiddenResponse({
    type: () => ErrorResponseDto,
  })
  @ApiNotFoundResponse({
    type: () => ErrorResponseDto,
  })
  async create(@Body() createDto: CreateKabinetDto) {
    return await this.kabinetService.create(createDto);
  }

  @Get()
  @ApiOkResponse({
    type: () => ReadKabinetDto,
    isArray: true,
  })
  @ApiBadRequestResponse({
    type: () => ErrorResponseDto,
  })
  @ApiRequestTimeoutResponse({
    type: () => ErrorResponseDto,
  })
  @ApiForbiddenResponse({
    type: () => ErrorResponseDto,
  })
  @ApiNotFoundResponse({
    type: () => ErrorResponseDto,
  })
  async getAll(): Promise<ReadKabinetDto[]> {
    return await this.kabinetService.getAll();
  }
}
