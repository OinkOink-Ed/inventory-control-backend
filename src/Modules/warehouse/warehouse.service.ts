import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Warehouse } from "@Modules/warehouse/entities/Warehouse";
import { PostCreateWarehouseDto } from "@Modules/warehouse/dto/PostCreateWarehouseDto";
import { SuccessResponseDto } from "@common/dto/SuccessResponseDto";
import { GetResponseAllWarehouseDto } from "@Modules/warehouse/dto/GetResponseAllWarehouseDto";
import { GetResponseAllDetailedWarehouseDto } from "@Modules/warehouse/dto/GetResponseAllDetailedWarehouseDto";
import { RequiredFindOptionsSelect } from "@common/types/typesUtils";
import { UserData } from "@common/decorators/types/UserType";
import { UserService } from "@Modules/user/user.service";
import { AccessControlService } from "@Modules/access-control/access-control.service";

@Injectable()
export class WarehouseService {
  constructor(
    @InjectRepository(Warehouse)
    private readonly repo: Repository<Warehouse>,
    private readonly usersService: UserService,
    private readonly accessControlService: AccessControlService,
  ) {}

  async createWarehouse(
    dto: PostCreateWarehouseDto,
  ): Promise<SuccessResponseDto> {
    await this.repo.save(dto);
    return {
      statusCode: HttpStatus.CREATED,
      message: "Склад успешно создан",
    };
  }

  async getAllWarehouses(
    userData: UserData,
  ): Promise<GetResponseAllWarehouseDto[]> {
    const select: RequiredFindOptionsSelect<GetResponseAllWarehouseDto> = {
      id: true,
      name: true,
    };

    if (userData.role.roleName !== "user") {
      return await this.repo.find({
        select,
      });
    }

    const divisionIds = await this.usersService.getDivisionOfUser(userData.id);

    return await this.repo.find({
      select,
      where: { division: { id: In(divisionIds) } },
      relations: { division: true },
    });
  }

  async getCabinetsByWarehouse(
    warehouseId: number,
    userData: UserData,
  ): Promise<GetResponseAllDetailedWarehouseDto | null> {
    await this.accessControlService.assertWarehouseAccess(
      userData,
      warehouseId,
    );

    const select: RequiredFindOptionsSelect<GetResponseAllDetailedWarehouseDto> =
      {
        id: true,
        division: {
          id: true,
          kabinets: {
            id: true,
            number: true,
          },
        },
      };

    return await this.repo.findOne({
      select,
      where: {
        id: warehouseId,
      },
      relations: {
        division: {
          kabinets: true,
        },
      },
    });
  }
}
