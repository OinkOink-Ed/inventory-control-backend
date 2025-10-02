import { ApiErrorResponses } from '@common/decorators/ApiErrorResponse';
import { Roles } from '@common/decorators/Roles';
import { UserData } from '@common/decorators/types/UserType';
import { User } from '@common/decorators/User';
import { SuccessResponseDto } from '@common/dto/SuccessResponseDto';
import { RoleGuard } from '@common/guards/RoleGuard';
import { GetResponseKabinetsDto } from '@Modules/kabinet/dto/GetResponseKabinetsDto';
import { PostCreateKabinetDto } from '@Modules/kabinet/dto/PostCreateKabinetDto';
import { KabinetService } from '@Modules/kabinet/kabinet.service';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Injectable,
  Param,
  PipeTransform,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { GetResponseKabinetsByUserIdDto } from './dto/GetResponseKabinetsByUserIdDto';
import { GetKabinetsByDivisionIdsForCreateUserDto } from './dto/GetKabinetsByDivisionIdsForCreateUserDto';

@Injectable()
export class DivisionIdsToNumberArrayPipe implements PipeTransform {
  transform(value: string): number[] {
    try {
      if (!value) return [];

      const decodedValue = decodeURIComponent(value);
      const parsed: any[] = JSON.parse(decodedValue);

      if (!Array.isArray(parsed)) {
        throw new BadRequestException('divisionIds must be an array');
      }

      return parsed
        .map((item) => item?.id)
        .filter(
          (id): id is number =>
            id !== undefined && id !== null && !isNaN(Number(id)),
        )
        .map(Number);
    } catch (error) {
      throw new BadRequestException('Invalid divisionIds format', error);
    }
  }
}

@ApiTags('Kabinets')
@Controller('kabinets')
@UseGuards(RoleGuard)
export class KabinetController {
  constructor(private readonly kabinetService: KabinetService) {}

  @Post()
  @Roles('admin', 'user')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: () => SuccessResponseDto,
  })
  @ApiErrorResponses()
  async create(
    @Body() createDto: PostCreateKabinetDto,
    @User() userData: { sub: { id: number } },
  ): Promise<SuccessResponseDto> {
    createDto.creator = { id: userData.sub.id };
    return await this.kabinetService.create(createDto);
  }

  @Get('division/:id')
  @Roles('admin', 'user')
  @ApiBearerAuth()
  @ApiOkResponse({
    type: () => GetResponseKabinetsDto,
    isArray: true,
  })
  @ApiErrorResponses()
  async getKabinetsByDivisionId(
    @Param('id') divisionId: number,
    @User('sub') userData: UserData,
  ): Promise<GetResponseKabinetsDto[]> {
    return await this.kabinetService.getKabinetsByDivisionId(
      divisionId,
      userData,
    );
  }

  @Get('for-create-user')
  @Roles('admin', 'user', 'staff')
  @ApiQuery({
    name: 'divisionIds',
    type: String,
    required: true,
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    type: () => GetKabinetsByDivisionIdsForCreateUserDto,
    isArray: true,
  })
  @ApiErrorResponses()
  async getKabinetsByDivisionIdForCreateUser(
    @Query('divisionIds', DivisionIdsToNumberArrayPipe)
    divisionIds: number[],
    @User('sub') userData: UserData,
  ): Promise<GetKabinetsByDivisionIdsForCreateUserDto[]> {
    return await this.kabinetService.getKabinetsByDivisionIdForCreateUser(
      divisionIds,
      userData,
    );
  }

  @Get('user/:id')
  @Roles('admin', 'user')
  @ApiBearerAuth()
  @ApiOkResponse({
    type: () => GetResponseKabinetsByUserIdDto,
    isArray: true,
  })
  @ApiErrorResponses()
  async getKabinetsByUserId(
    @Param('id') userId: number,
  ): Promise<GetResponseKabinetsByUserIdDto[]> {
    return await this.kabinetService.getKabinetsByUserId(userId);
  }
}
