import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, QueryRunner, Repository } from 'typeorm';
import { Cartridge } from '@Modules/cartridge/entities/Cartridge';
import { ServiceCreateCartridge } from '@Modules/cartridge/ClassesForMapping/ServiceCreateCartridge';
import { ServiceMoveCartridge } from '@Modules/cartridge/ClassesForMapping/ServiceMoveCartridge';
import { ServiceDeliveryCartridge } from '@Modules/cartridge/ClassesForMapping/ServiceDeliveryCartridge';
import { ServiceDecommissioningCartridge } from '@Modules/cartridge/ClassesForMapping/ServiceDecommissioningCartridge';
import { GetResponseAllCartridgeInWarehouseDto } from '@Modules/cartridge/dto/GetResponseAllCartridgeInWarehouseDto';
import { CartridgeStatus } from '@common/enums/CartridgeStatus';
import { NoCartridgesException } from '@common/filters/types/NoCartridgesException';
import { InsufficientCartridgesException } from '@common/filters/types/InsufficientCartridgesException';
import type { Base } from '@common/entities/Base';
import { RequiredFindOptionsSelect } from '@common/utils/typesUtils';
import { UserData } from '@common/decorators/types/UserType';
import { UserService } from '@Modules/user/user.service';
import { ServiceCountCartridgeByModel } from './dto/ServiceCountCartridgeByModel';
import { GetResponseCartridgeCountDto } from './dto/GetResponseCartridgeCountDto';

@Injectable()
export class CartridgeService {
  constructor(
    @InjectRepository(Cartridge)
    private readonly repoCartridges: Repository<Cartridge>,
    private readonly usersService: UserService,
  ) {}

  selectFieldsToUpdate: RequiredFindOptionsSelect<
    Pick<Base, 'id' | 'createdAt'>
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
    try {
      const { count, model, warehouseFrom, warehouseWhere, state } = dto;

      const cartridgeRepo = queryRunner.manager.getRepository(Cartridge);

      const cartridgeToUpdate = await cartridgeRepo.find({
        select: this.selectFieldsToUpdate,
        where: {
          model: { id: model.id },
          warehouse: { id: warehouseFrom.id },
          state: CartridgeStatus.RECEIVED,
        },
        order: {
          createdAt: 'ASC',
        },
        take: count,
      });

      if (cartridgeToUpdate.length === 0) {
        throw new BadRequestException(
          'Такого количества картриджей нет на складе',
        );
      }

      const updatesIds: Array<number> = cartridgeToUpdate.map((row) => row.id);

      const result = await cartridgeRepo.update(
        { id: In(updatesIds) },
        { state: state, warehouse: warehouseWhere },
      );

      if (result.affected === 0) {
        throw new BadRequestException(
          'Ошибка при попытке перемещения картриджа',
        );
      }

      return updatesIds;
    } catch (error) {
      throw error;
    }
  }

  async deliveryMany(dto: ServiceDeliveryCartridge, queryRunner: QueryRunner) {
    try {
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
          createdAt: 'ASC',
        },
        take: count,
      });

      if (cartridgeToDelivery.length === 0) {
        throw new NoCartridgesException();
      } else if (cartridgeToDelivery.length < count) {
        throw new InsufficientCartridgesException();
      }

      const deliveryIds: Array<number> = cartridgeToDelivery.map(
        (row) => row.id,
      );

      const result = await cartridgeRepo.update(
        { id: In(deliveryIds) },
        { state: state },
      );

      if (result.affected === 0) {
        throw new BadRequestException(
          'Такого количества картриджей нет на складе',
        );
      }

      return deliveryIds;
    } catch (error) {
      throw error;
    }
  }

  async decommissioningMany(
    dto: ServiceDecommissioningCartridge,
    queryRunner: QueryRunner,
  ) {
    try {
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
          createdAt: 'ASC',
        },
        take: count,
      });

      if (cartridgeToDecommissioning.length === 0) {
        throw new BadRequestException('Нет картриджей для списания');
      } else if (cartridgeToDecommissioning.length < count) {
        throw new BadRequestException(
          'Нет такого количества картриджей для списания',
        );
      }

      const decommissioningIds: Array<number> = cartridgeToDecommissioning.map(
        (row) => row.id,
      );

      const result = await cartridgeRepo.update(
        { id: In(decommissioningIds) },
        { state: state },
      );

      if (result.affected === 0) {
        throw new Error('Ошибка при попытке списания картриджа');
      }

      return decommissioningIds;
    } catch (error) {
      throw error;
    }
  }

  async getCartridgesByWarehouse(
    warehouseId: number,
    userData: UserData,
  ): Promise<GetResponseAllCartridgeInWarehouseDto[]> {
    const select: RequiredFindOptionsSelect<GetResponseAllCartridgeInWarehouseDto> =
      {
        id: true,
        model: { id: true, name: true },
        state: true,
        warehouse: { id: true, name: true },
        createdAt: true,
      };

    if (userData.role.roleName !== 'user') {
      return await this.repoCartridges.find({
        where: {
          warehouse: { id: warehouseId },
          state: In([CartridgeStatus.RECEIVED, CartridgeStatus.MOVED]),
        },
        select,
        relations: { warehouse: true, model: true },
      });
    }

    const divisionsId = await this.usersService.getDivisionOfUser(userData.id);

    return await this.repoCartridges.find({
      where: {
        warehouse: { division: { id: In(divisionsId) } },
        state: In([CartridgeStatus.RECEIVED, CartridgeStatus.MOVED]),
      },
      select,
      relations: { warehouse: true, model: true },
    });
  }

  async getCartridgesCount(
    userData: UserData,
  ): Promise<GetResponseCartridgeCountDto[]> {
    if (userData.role.roleName !== 'user') {
      const rawResults: ServiceCountCartridgeByModel[] =
        await this.repoCartridges
          .createQueryBuilder('cartridge')
          .select('model.id AS modelId')
          .addSelect('model.name AS modelName')
          .addSelect('COUNT(cartridge.id) AS totalCount')
          .innerJoin('cartridge.warehouse', 'warehouse')
          .innerJoin('cartridge.model', 'model')
          .where('cartridge.state IN (:...states)', {
            states: [CartridgeStatus.RECEIVED, CartridgeStatus.MOVED],
          })
          .groupBy('model.id')
          .addGroupBy('model.name')
          .orderBy('model.name')
          .getRawMany();

      const totalByModel = rawResults.map((row) => ({
        modelName: row.modelName,
        count: parseInt(row.totalCount, 10),
      }));

      return totalByModel;
    }

    const divisionsId = await this.usersService.getDivisionOfUser(userData.id);

    const rawResults: ServiceCountCartridgeByModel[] = await this.repoCartridges
      .createQueryBuilder('cartridge')
      .select('model.id AS modelId')
      .addSelect('model.name AS modelName')
      .addSelect('COUNT(cartridge.id) AS totalCount')
      .innerJoin('cartridge.warehouse', 'warehouse')
      .innerJoin('cartridge.model', 'model')
      .innerJoin('warehouse.division', 'division')
      .where('cartridge.state IN (:...states)', {
        states: [CartridgeStatus.RECEIVED, CartridgeStatus.MOVED],
      })
      .andWhere('division.id IN (:...divisionIds)', {
        divisionIds: divisionsId,
      })
      .groupBy('model.id')
      .addGroupBy('model.name')
      .orderBy('model.name')
      .getRawMany();

    const totalByModel = rawResults.map((row) => ({
      modelName: row.modelName,
      count: parseInt(row.totalCount, 10),
    }));

    return totalByModel;
  }
}
