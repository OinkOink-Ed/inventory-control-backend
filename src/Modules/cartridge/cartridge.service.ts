import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, QueryRunner, Repository } from "typeorm";
import { Cartridge } from "@Modules/cartridge/entities/Cartridge";
import { ServiceCreateCartridge } from "@Modules/cartridge/ClassesForMapping/ServiceCreateCartridge";
import { ServiceMoveCartridge } from "@Modules/cartridge/ClassesForMapping/ServiceMoveCartridge";
import { ServiceDeliveryCartridge } from "@Modules/cartridge/ClassesForMapping/ServiceDeliveryCartridge";
import { ServiceDecommissioningCartridge } from "@Modules/cartridge/ClassesForMapping/ServiceDecommissioningCartridge";
import { GetResponseAllCartridgeInWarehouseDto } from "@Modules/cartridge/dto/GetResponseAllCartridgeInWarehouseDto";
import { CartridgeStatus } from "@common/enums/CartridgeStatus";
import { NoCartridgesException } from "@common/filters/types/NoCartridgesException";
import { InsufficientCartridgesException } from "@common/filters/types/InsufficientCartridgesException";
import type { Base } from "@common/entities/Base";
import { RequiredFindOptionsSelect } from "@common/utils/typesUtils";
import { UserData } from "@common/decorators/types/UserType";
import { UserService } from "@Modules/user/user.service";
import { ServiceCountCartridgeByModel } from "./dto/ServiceCountCartridgeByModel";
import { GetResponseCartridgeCountDto } from "./dto/GetResponseCartridgeCountDto";
import { AccessControlService } from "@Modules/access-control/access-control.service";

@Injectable()
export class CartridgeService {
  constructor(
    @InjectRepository(Cartridge)
    private readonly repoCartridges: Repository<Cartridge>,
    private readonly usersService: UserService,
    private readonly accessControlService: AccessControlService,
  ) {}

  selectFieldsToUpdate: RequiredFindOptionsSelect<
    Pick<Base, "id" | "createdAt">
  > = {
    id: true,
    createdAt: true,
  };

  async createMany(
    dto: ServiceCreateCartridge,
    queryRunner: QueryRunner,
  ): Promise<Array<{ id: number }>> {
    const { count, ...restDto } = dto;

    // Создаем одинакоыве dto (занимаем память)
    const dtos = Array.from({ length: count }, () => ({
      model: { id: restDto.model.id },
      warehouse: { id: restDto.warehouse.id },
      creator: { id: restDto.creator.id },
      state: restDto.state || CartridgeStatus.RECEIVED,
    }));

    try {
      const cartridgeRepo = queryRunner.manager.getRepository(Cartridge);

      //Так быстрее если не много
      const result = await cartridgeRepo.insert(dtos);

      const createdIds: Array<{ id: number }> = result.identifiers.map(
        (idObj) => ({ id: idObj.id }),
      );

      return createdIds;
    } catch (error) {
      throw error;
    }
  }

  async moveMany(dto: ServiceMoveCartridge, queryRunner: QueryRunner) {
    const { count, model, warehouseFrom, warehouseWhere, state } = dto;

    const cartridgeRepo = queryRunner.manager.getRepository(Cartridge);

    const cartridgeToUpdate = await cartridgeRepo.find({
      select: this.selectFieldsToUpdate,
      where: {
        model: {
          id: model.id,
        },
        warehouse: {
          id: warehouseFrom.id,
        },
        state: CartridgeStatus.RECEIVED,
      },
      order: {
        createdAt: "ASC",
      },
      take: count,
      lock: {
        mode: "pessimistic_write",
      },
    });

    if (cartridgeToUpdate.length !== count) {
      throw new BadRequestException(
        "Недостаточно картриджей на складе для перемещения",
      );
    }

    const updateIds = cartridgeToUpdate.map((cartridge) => cartridge.id);

    const result = await cartridgeRepo.update(
      {
        id: In(updateIds),
      },
      {
        state,
        warehouse: warehouseWhere,
      },
    );

    if (result.affected !== updateIds.length) {
      throw new BadRequestException(
        "Не удалось переместить все выбранные картриджи",
      );
    }

    return updateIds;
  }

  async deliveryMany(dto: ServiceDeliveryCartridge, queryRunner: QueryRunner) {
    const { count, model, warehouse, state } = dto;

    const cartridgeRepo = queryRunner.manager.getRepository(Cartridge);

    const cartridgeToDelivery = await cartridgeRepo.find({
      select: this.selectFieldsToUpdate,
      where: {
        model: { id: model.id },
        warehouse: { id: warehouse.id },
        state: In([CartridgeStatus.RECEIVED, CartridgeStatus.MOVED]),
      },
      order: {
        createdAt: "ASC",
      },
      take: count,
      lock: {
        mode: "pessimistic_write",
      },
    });

    if (cartridgeToDelivery.length === 0) {
      throw new NoCartridgesException();
    }

    if (cartridgeToDelivery.length < count) {
      throw new InsufficientCartridgesException();
    }

    const deliveryIds = cartridgeToDelivery.map((cartridge) => cartridge.id);

    const result = await cartridgeRepo.update(
      {
        id: In(deliveryIds),
      },
      {
        state,
      },
    );

    if (result.affected !== deliveryIds.length) {
      throw new BadRequestException(
        "Не удалось выдать все выбранные картриджи",
      );
    }

    return deliveryIds;
  }

  async decommissioningMany(
    dto: ServiceDecommissioningCartridge,
    queryRunner: QueryRunner,
  ) {
    const { count, model, warehouse, state } = dto;

    const cartridgeRepo = queryRunner.manager.getRepository(Cartridge);

    const cartridgeToDecommissioning = await cartridgeRepo.find({
      select: this.selectFieldsToUpdate,
      where: {
        model: { id: model.id },
        warehouse: { id: warehouse.id },
        state: In([CartridgeStatus.RECEIVED, CartridgeStatus.MOVED]),
      },
      order: {
        createdAt: "ASC",
      },
      take: count,
      lock: {
        mode: "pessimistic_write",
      },
    });

    if (cartridgeToDecommissioning.length === 0) {
      throw new BadRequestException("Нет картриджей для списания");
    }

    if (cartridgeToDecommissioning.length < count) {
      throw new BadRequestException(
        "Нет такого количества картриджей для списания",
      );
    }

    const decommissioningIds = cartridgeToDecommissioning.map(
      (cartridge) => cartridge.id,
    );

    const result = await cartridgeRepo.update(
      {
        id: In(decommissioningIds),
      },
      {
        state,
      },
    );

    if (result.affected !== decommissioningIds.length) {
      throw new BadRequestException(
        "Не удалось списать все выбранные картриджи",
      );
    }

    return decommissioningIds;
  }

  async getCartridgesByWarehouse(
    warehouseId: number,
    userData: UserData,
  ): Promise<GetResponseAllCartridgeInWarehouseDto[]> {
    await this.accessControlService.assertWarehouseAccess(
      userData,
      warehouseId,
    );

    const select: RequiredFindOptionsSelect<GetResponseAllCartridgeInWarehouseDto> =
      {
        id: true,
        model: { id: true, name: true },
        state: true,
        warehouse: { id: true, name: true },
        createdAt: true,
      };

    return await this.repoCartridges.find({
      where: {
        warehouse: {
          id: warehouseId,
        },
        state: In([CartridgeStatus.RECEIVED, CartridgeStatus.MOVED]),
      },
      select,
      relations: {
        warehouse: true,
        model: true,
      },
    });
  }

  async getCartridgesCount(
    userData: UserData,
  ): Promise<GetResponseCartridgeCountDto[]> {
    if (userData.role.roleName !== "user") {
      const rawResults: ServiceCountCartridgeByModel[] =
        await this.repoCartridges
          .createQueryBuilder("cartridge")
          .select("model.id AS modelId")
          .addSelect("model.name AS modelName")
          .addSelect("COUNT(cartridge.id) AS totalCount")
          .innerJoin("cartridge.warehouse", "warehouse")
          .innerJoin("cartridge.model", "model")
          .where("cartridge.state IN (:...states)", {
            states: [CartridgeStatus.RECEIVED, CartridgeStatus.MOVED],
          })
          .groupBy("model.id")
          .addGroupBy("model.name")
          .orderBy("model.name")
          .getRawMany();

      const totalByModel = rawResults.map((row) => ({
        modelName: row.modelName,
        count: parseInt(row.totalCount, 10),
      }));

      return totalByModel;
    }

    const divisionsId = await this.usersService.getDivisionOfUser(userData.id);

    const rawResults: ServiceCountCartridgeByModel[] = await this.repoCartridges
      .createQueryBuilder("cartridge")
      .select("model.id AS modelId")
      .addSelect("model.name AS modelName")
      .addSelect("COUNT(cartridge.id) AS totalCount")
      .innerJoin("cartridge.warehouse", "warehouse")
      .innerJoin("cartridge.model", "model")
      .innerJoin("warehouse.division", "division")
      .where("cartridge.state IN (:...states)", {
        states: [CartridgeStatus.RECEIVED, CartridgeStatus.MOVED],
      })
      .andWhere("division.id IN (:...divisionIds)", {
        divisionIds: divisionsId,
      })
      .groupBy("model.id")
      .addGroupBy("model.name")
      .orderBy("model.name")
      .getRawMany();

    const totalByModel = rawResults.map((row) => ({
      modelName: row.modelName,
      count: parseInt(row.totalCount, 10),
    }));

    return totalByModel;
  }
}
