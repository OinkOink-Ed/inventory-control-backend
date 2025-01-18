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
  ApiRequestTimeoutResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ModelCartridgesService } from './model-cartridges.service';
import {
  ErrorResponse400,
  ErrorResponse403,
  ErrorResponse404,
  ErrorResponse408,
} from 'src/common/errorTypes';
import { SuccessResponse200 } from 'src/common/successTypes';
import { CreateModelCartridgeDto } from './dto/CreateModelCartridgeDto';

@ApiTags('ModelCartridges')
@Controller('model-cartridges')
export class ModelCartridgesController {
  constructor(private readonly createModelCartridge: ModelCartridgesService) {}

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
  async create(@Body() createDto: CreateModelCartridgeDto) {
    return await this.createModelCartridge.create(createDto);
  }

  @Get()
  // @ApiCreatedResponse({
  //   type: () => RoleResponsWhithUserDto,
  //   isArray: true,
  // })
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
  async getAll() {
    return await this.createModelCartridge.getAll();
  }
}
