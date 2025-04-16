import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiRequestTimeoutResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DivisionService } from './division.service';
import { SuccessResponse } from 'src/common/dto/SuccessResponseDto';
import { ErrorResponseDto } from 'src/common/dto/ErrorResponseDto';
import { DivisionBaseRequestDto } from 'src/Modules/division/dto/DivisionBaseRequestDto';
import { ResponseGetAllDivision } from './dto/ResponseGetAllDivision';

@ApiTags('Division')
@Controller('division')
export class DivisionController {
  constructor(private readonly divisionService: DivisionService) {}

  @Post()
  @ApiBearerAuth()
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
  async create(
    @Body() createDto: DivisionBaseRequestDto,
  ): Promise<SuccessResponse> {
    return await this.divisionService.create(createDto);
  }

  //нужно ещё guard для проверки роли запилить
  //И после обработать лоигку вызова того или иного метода
  //Пока что тяжело для понимания, нужно оставить на потом
  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({
    type: () => ResponseGetAllDivision,
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
  async getAll(): Promise<ResponseGetAllDivision[]> {
    return await this.divisionService.getAll();
  }
}
