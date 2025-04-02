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
import { DivisionService } from './division.service';
import { SuccessResponse200 } from 'src/common/successTypes';
import {
  ErrorResponse400,
  ErrorResponse403,
  ErrorResponse404,
  ErrorResponse408,
} from 'src/common/errorTypes';
import { CreateDivisionDto } from './dto/CreateDivisionDto';
import { ReadDivisionDto } from './dto/ReadDivisionDto';

@ApiTags('Division')
@Controller('division')
export class DivisionController {
  constructor(private readonly divisionService: DivisionService) {}

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
  async create(@Body() createDto: CreateDivisionDto) {
    return await this.divisionService.create(createDto);
  }

  @Get()
  @ApiOkResponse({
    type: () => ReadDivisionDto,
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
  async getAll(): Promise<ReadDivisionDto[]> {
    return await this.divisionService.getAll();
  }
}
