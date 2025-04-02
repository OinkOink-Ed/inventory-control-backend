import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
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
import { SuccessResponse200 } from 'src/common/successTypes';
import {
  ErrorResponse400,
  ErrorResponse403,
  ErrorResponse404,
  ErrorResponse408,
} from 'src/common/errorTypes';
import { CreateKabinetDto } from './dto/CreateKabinetDto';
import { ReadKabinetDto } from './dto/ReadKabinetDto';

@ApiTags('Kabinet')
@Controller('kabinet')
export class KabinetController {
  constructor(private readonly kabinetService: KabinetService) {}

  @Post()
  @ApiCreatedResponse({
    type: () => SuccessResponse200,
  })
  @ApiBadRequestResponse({
    type: () => ErrorResponse400,
  })
  @ApiRequestTimeoutResponse({
    type: () => ErrorResponse408,
  })
  @ApiForbiddenResponse({
    type: () => ErrorResponse403,
  })
  @ApiNotFoundResponse({
    type: () => ErrorResponse404,
  })
  @HttpCode(HttpStatus.OK)
  async create(@Body() createDto: CreateKabinetDto) {
    return await this.kabinetService.create(createDto);
  }

  @Get()
  @ApiOkResponse({
    type: () => ReadKabinetDto,
    isArray: true,
  })
  @ApiBadRequestResponse({
    type: () => ErrorResponse400,
  })
  @ApiRequestTimeoutResponse({
    type: () => ErrorResponse408,
  })
  @ApiForbiddenResponse({
    type: () => ErrorResponse403,
  })
  @ApiNotFoundResponse({
    type: () => ErrorResponse404,
  })
  async getAll(): Promise<ReadKabinetDto[]> {
    return await this.kabinetService.getAll();
  }
}
