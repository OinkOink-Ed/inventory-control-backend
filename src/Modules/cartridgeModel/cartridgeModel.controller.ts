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
import {
  ErrorResponse400,
  ErrorResponse403,
  ErrorResponse404,
  ErrorResponse408,
} from 'src/common/errorTypes';

import { SuccessResponse200 } from 'src/common/successTypes';
import { CreateCartridgeModelDto } from './dto/CreateCartridgeModelDto';
import { ReadCartridgeModelDto } from './dto/ReadCartridgeModelDto';
import { CartridgeModelService } from './cartridgeModel.service';

@ApiTags('CartridgeModel')
@Controller('cartridgeModel')
export class CartridgeModelController {
  constructor(private readonly createModelCartridge: CartridgeModelService) {}

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
  async create(
    @Body() createDto: CreateCartridgeModelDto,
  ): Promise<
    | SuccessResponse200
    | ErrorResponse400
    | ErrorResponse408
    | ErrorResponse403
    | ErrorResponse404
  > {
    await this.createModelCartridge.create(createDto);
    return {
      statusCode: 200,
      message: 'Модель картриджа успешно добавлена',
    };
  }

  @Get('detailed')
  @ApiCreatedResponse({
    type: () => ReadCartridgeModelDto,
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
  @HttpCode(HttpStatus.OK)
  async getAllDetailed(): Promise<ReadCartridgeModelDto[]> {
    return await this.createModelCartridge.getAllDetailed();
  }

  @Get()
  @ApiCreatedResponse({
    type: () => ReadCartridgeModelDto,
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
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<ReadCartridgeModelDto[]> {
    return await this.createModelCartridge.getAll();
  }
}
