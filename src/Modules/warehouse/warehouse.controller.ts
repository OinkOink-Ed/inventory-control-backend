import { ApiErrorResponses } from "@common/decorators/ApiErrorResponse";
import { Roles } from "@common/decorators/Roles";
import { UserData } from "@common/decorators/types/UserType";
import { User } from "@common/decorators/User";
import { SuccessResponseDto } from "@common/dto/SuccessResponseDto";
import { RoleName } from "@common/enums/RoleName";
import { RoleGuard } from "@common/guards/RoleGuard";
import { GetResponseAllDetailedWarehouseDto } from "@Modules/warehouse/dto/GetResponseAllDetailedWarehouseDto";
import { GetResponseAllWarehouseDto } from "@Modules/warehouse/dto/GetResponseAllWarehouseDto";
import { PostCreateWarehouseDto } from "@Modules/warehouse/dto/PostCreateWarehouseDto";
import { WarehouseService } from "@Modules/warehouse/warehouse.service";
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Warehouse")
@Controller("warehouse")
@UseGuards(RoleGuard)
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Roles(RoleName.ADMIN)
  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: () => SuccessResponseDto,
  })
  @ApiErrorResponses()
  async createWarehouse(
    @Body() createDto: PostCreateWarehouseDto,
    @User("sub") userData: UserData,
  ): Promise<SuccessResponseDto> {
    createDto.creator = { id: userData.id };
    return await this.warehouseService.createWarehouse(createDto);
  }

  @Roles(RoleName.ADMIN, RoleName.USER)
  @Get("detailed/:warehouseId")
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: () => GetResponseAllDetailedWarehouseDto,
  })
  @ApiErrorResponses()
  async getCabinetsByWarehouse(
    @Param("warehouseId", ParseIntPipe) warehouseId: number,
    @User("sub") userData: UserData,
  ): Promise<GetResponseAllDetailedWarehouseDto | null> {
    return await this.warehouseService.getCabinetsByWarehouse(
      warehouseId,
      userData,
    );
  }

  @Get()
  @Roles(RoleName.ADMIN, RoleName.USER)
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: () => GetResponseAllWarehouseDto,
    isArray: true,
  })
  @ApiErrorResponses()
  async getWarehouses(
    @User("sub") userData: UserData,
  ): Promise<GetResponseAllWarehouseDto[]> {
    return await this.warehouseService.getAllWarehouses(userData);
  }
}
