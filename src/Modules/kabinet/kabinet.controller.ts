import { ApiErrorResponses } from "@common/decorators/ApiErrorResponse";
import { Roles } from "@common/decorators/Roles";
import { UserData } from "@common/decorators/types/UserType";
import { User } from "@common/decorators/User";
import { SuccessResponseDto } from "@common/dto/SuccessResponseDto";
import { RoleGuard } from "@common/guards/RoleGuard";
import { GetResponseKabinetsDto } from "@Modules/kabinet/dto/GetResponseKabinetsDto";
import { PostCreateKabinetDto } from "@Modules/kabinet/dto/PostCreateKabinetDto";
import { KabinetService } from "@Modules/kabinet/kabinet.service";
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Injectable,
  Param,
  ParseIntPipe,
  PipeTransform,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import { GetResponseKabinetsByUserIdDto } from "./dto/GetResponseKabinetsByUserIdDto";
import { GetKabinetsByDivisionIdsForCreateUserDto } from "./dto/GetKabinetsByDivisionIdsForCreateUserDto";
import { RoleName } from "@common/enums/RoleName";

@Injectable()
export class DivisionIdsToNumberArrayPipe implements PipeTransform<
  string,
  number[]
> {
  transform(value: string): number[] {
    if (!value?.trim()) {
      throw new BadRequestException("divisionIds is required");
    }

    const ids = value
      .split(",")
      .map((item) => item.trim())
      .map(Number);

    if (ids.some((id) => !Number.isInteger(id) || id <= 0)) {
      throw new BadRequestException(
        "divisionIds must contain positive integer IDs",
      );
    }

    return [...new Set(ids)];
  }
}

@ApiTags("Kabinets")
@Controller("kabinets")
@UseGuards(RoleGuard)
export class KabinetController {
  constructor(private readonly kabinetService: KabinetService) {}

  @Post()
  @Roles(RoleName.ADMIN, RoleName.USER)
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

  @Get("division/:id")
  @Roles(RoleName.ADMIN, RoleName.USER)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: () => GetResponseKabinetsDto,
    isArray: true,
  })
  @ApiErrorResponses()
  async getKabinetsByDivisionId(
    @Param("id", ParseIntPipe) divisionId: number,
    @User("sub") userData: UserData,
  ): Promise<GetResponseKabinetsDto[]> {
    return await this.kabinetService.getKabinetsByDivisionId(
      divisionId,
      userData,
    );
  }

  @Get("for-create-user")
  @Roles(RoleName.ADMIN, RoleName.USER)
  @ApiQuery({
    name: "divisionIds",
    type: String,
    required: true,
    example: "1,2,3",
    description: "ID подразделений через запятую",
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    type: () => GetKabinetsByDivisionIdsForCreateUserDto,
    isArray: true,
  })
  @ApiErrorResponses()
  async getKabinetsByDivisionIdForCreateUser(
    @Query("divisionIds", DivisionIdsToNumberArrayPipe)
    divisionIds: number[],
    @User("sub") userData: UserData,
  ): Promise<GetKabinetsByDivisionIdsForCreateUserDto[]> {
    return await this.kabinetService.getKabinetsByDivisionIdForCreateUser(
      divisionIds,
      userData,
    );
  }

  @Get("user/:id")
  @Roles(RoleName.ADMIN, RoleName.USER)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: () => GetResponseKabinetsByUserIdDto,
    isArray: true,
  })
  @ApiErrorResponses()
  async getKabinetsByUserId(
    @Param("id") userId: number,
  ): Promise<GetResponseKabinetsByUserIdDto[]> {
    return await this.kabinetService.getKabinetsByUserId(userId);
  }
}
