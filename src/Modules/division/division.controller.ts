import { ApiErrorResponses } from '@common/decorators/ApiErrorResponse';
import { User } from '@common/decorators/User';
import { SuccessResponseDto } from '@common/dto/SuccessResponseDto';
import { DivisionService } from '@Modules/division/division.service';
import { GetReponseAllDivisionDto } from '@Modules/division/dto/GetReponseAllDivisionDto';
import { PostCreateDivisionDto } from '@Modules/division/dto/PostCreateDivisionDto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
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
  @ApiErrorResponses()
  async create(
    @Body() createDto: PostCreateDivisionDto,
    @User() userData: { sub: { id: number } },
  ): Promise<SuccessResponseDto> {
    createDto.creator = { id: userData.sub.id };
    return await this.divisionService.create(createDto);
  }

  //нужно ещё guard для проверки роли запилить
  //И после обработать лоигку вызова того или иного метода
  //Пока что тяжело для понимания, нужно оставить на потом
  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({
    type: () => GetReponseAllDivisionDto,
    isArray: true,
  })
  @ApiErrorResponses()
  async getAll(): Promise<GetReponseAllDivisionDto[]> {
    return await this.divisionService.getAll();
  }
}
