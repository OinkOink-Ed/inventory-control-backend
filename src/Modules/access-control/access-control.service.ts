import { UserService } from "@Modules/user/user.service";
import { Warehouse } from "@Modules/warehouse/entities/Warehouse";
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserData } from "@common/decorators/types/UserType";
import { Division } from "@Modules/division/entities/Division";

@Injectable()
export class AccessControlService {
  constructor(
    private readonly userService: UserService,

    @InjectRepository(Warehouse)
    private readonly warehouseRepository: Repository<Warehouse>,

    @InjectRepository(Division)
    private readonly divisionRepository: Repository<Division>,
  ) {}

  async assertDivisionAccess(
    userData: UserData,
    divisionId: number,
  ): Promise<void> {
    const divisionExists = await this.divisionRepository.exists({
      where: {
        id: divisionId,
      },
    });

    if (!divisionExists) {
      throw new NotFoundException("Подразделение не найдено");
    }

    if (userData.role.roleName === "admin") {
      return;
    }

    const userDivisionIds = await this.userService.getDivisionOfUser(
      userData.id,
    );

    if (!userDivisionIds.includes(divisionId)) {
      throw new ForbiddenException("У вас нет доступа к этому подразделению");
    }
  }

  async assertWarehouseAccess(
    userData: UserData,
    warehouseId: number,
  ): Promise<void> {
    const warehouse = await this.warehouseRepository.findOne({
      where: {
        id: warehouseId,
      },
      select: {
        id: true,
        division: {
          id: true,
        },
      },
      relations: {
        division: true,
      },
    });

    if (!warehouse) {
      throw new NotFoundException("Склад не найден");
    }

    if (userData.role.roleName === "admin") {
      return;
    }

    await this.assertDivisionAccess(userData, warehouse.division.id);
  }

  async assertUserCanAcceptWarehouse(
    userId: number,
    warehouseId: number,
  ): Promise<void> {
    const [user, warehouse] = await Promise.all([
      this.userService.findUserForEditAccess(userId),

      this.warehouseRepository.findOne({
        where: {
          id: warehouseId,
        },
        select: {
          id: true,
          division: {
            id: true,
          },
        },
        relations: {
          division: true,
        },
      }),
    ]);

    if (!user) {
      throw new NotFoundException("Принимающий пользователь не найден");
    }

    if (!warehouse) {
      throw new NotFoundException("Целевой склад не найден");
    }

    if (user.role.roleName !== "user") {
      throw new BadRequestException(
        "Принимающим должен быть ответственный пользователь подразделения",
      );
    }

    const belongsToTargetDivision = user.division.some(
      (division) => division.id === warehouse.division.id,
    );

    if (!belongsToTargetDivision) {
      throw new BadRequestException(
        "Принимающий пользователь не относится к подразделению целевого склада",
      );
    }
  }
}
