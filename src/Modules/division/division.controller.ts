import { ErrorResponseDto } from '@common/dto/ErrorResponseDto';
import { SuccessResponseDto } from '@common/dto/SuccessResponseDto';
import { DivisionService } from '@Modules/division/division.service';
import { GetReponseAllDivisionDto } from '@Modules/division/dto/GetReponseAllDivisionDto';
import { PostCreateDivisionDto } from '@Modules/division/dto/PostCreateDivisionDto';
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

@ApiTags('Division')
@Controller('division')
export class DivisionController {
  constructor(private readonly divisionService: DivisionService) {}

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: () => SuccessResponseDto,
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
    @Body() createDto: PostCreateDivisionDto,
  ): Promise<SuccessResponseDto> {
    return await this.divisionService.create(createDto);
  }

  //нужно ещё guard для проверки роли запилить
  //И после обработать лоигку вызова того или иного метода
  //Пока что тяжело для понимания, нужно оставить на потом
  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({
    type: () => GetReponseAllDivisionDto,
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
  async getAll(): Promise<GetReponseAllDivisionDto[]> {
    return await this.divisionService.getAll();
  }
}
