import { ApiErrorResponses } from '@common/decorators/ApiErrorResponse';
import { Roles } from '@common/decorators/Roles';
import { UserData } from '@common/decorators/types/UserType';
import { User } from '@common/decorators/User';
import { SuccessResponseDto } from '@common/dto/SuccessResponseDto';
import { RoleGuard } from '@common/guards/RoleGuard';
import { DivisionService } from '@Modules/division/division.service';
import { GetReponseAllDivisionDto } from '@Modules/division/dto/GetReponseAllDivisionDto';
import { PostCreateDivisionDto } from '@Modules/division/dto/PostCreateDivisionDto';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetResponseDivisionByWarehouseIdDto } from './dto/GetResponseDivisionByWarehouseIdDto';

@ApiTags('Division')
@Controller('division')
@UseGuards(RoleGuard)
export class DivisionController {
  constructor(private readonly divisionService: DivisionService) {}

  @Roles('admin')
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

  @Roles('admin', 'user')
  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({
    type: () => GetReponseAllDivisionDto,
    isArray: true,
  })
  @ApiErrorResponses()
  async getDivisions(
    @User('sub') userData: UserData,
  ): Promise<GetReponseAllDivisionDto[]> {
    return await this.divisionService.getDivisions(userData);
  }

  @Roles('admin', 'user')
  @Get('warehouse/:id')
  @ApiBearerAuth()
  @ApiOkResponse({
    type: () => GetResponseDivisionByWarehouseIdDto,
  })
  @ApiErrorResponses()
  async getDivision(
    @Param('id', ParseIntPipe) warehouseId: number,
  ): Promise<GetResponseDivisionByWarehouseIdDto | null> {
    return await this.divisionService.getDivision(warehouseId);
  }
}
