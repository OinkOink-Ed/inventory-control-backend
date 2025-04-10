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
import { DivisionService } from './division.service';
import { CreateDivisionDto } from './dto/CreateDivisionDto';
import { ReadDivisionDto } from './dto/ReadDivisionDto';
import { SuccessResponse } from 'src/common/dto/SuccessResponseDto';
import { ErrorResponseDto } from 'src/common/dto/ErrorResponseDto';

@ApiTags('Division')
@Controller('division')
export class DivisionController {
  constructor(private readonly divisionService: DivisionService) {}

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
  async create(@Body() createDto: CreateDivisionDto) {
    return await this.divisionService.create(createDto);
  }

  @Get()
  @ApiOkResponse({
    type: () => ReadDivisionDto,
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
  async getAll(): Promise<ReadDivisionDto[]> {
    return await this.divisionService.getAll();
  }
}
