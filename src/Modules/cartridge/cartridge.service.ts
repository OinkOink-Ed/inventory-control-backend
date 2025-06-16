import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, QueryRunner, Repository } from 'typeorm';
import { Cartridge } from '@Modules/cartridge/entities/Cartridge';
import { ServiceCreateCartridge } from '@Modules/cartridge/service/ServiceCreateCartridge';
import { ServiceMoveCartridge } from '@Modules/cartridge/service/ServiceMoveCartridge';
import { ServiceDeliveryCartridge } from '@Modules/cartridge/service/ServiceDeliveryCartridge';
import { ServiceDecommissioningCartridge } from '@Modules/cartridge/service/ServiceDecommissioningCartridge';
import { GetResponseAllCartridgeInWarehouseDto } from '@Modules/cartridge/dto/GetResponseAllCartridgeInWarehouseDto';
import { CartridgeStatus } from '@common/enums/CartridgeStatus';
import { NoCartridgesException } from '@common/filters/types/NoCartridgesException';
import { InsufficientCartridgesException } from '@common/filters/types/InsufficientCartridgesException';

@Injectable()
export class CartridgeService {
  constructor(
    @InjectRepository(Cartridge)
    private readonly repoCartridges: Repository<Cartridge>,
  ) {}

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
        select: { id: true, createdAt: true },
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
        throw new Error('Такого количества картриджей нет на складе');
      }

      const updatesIds: Array<number> = cartridgeToUpdate.map((row) => row.id);

      const result = await cartridgeRepo.update(
        { id: In(updatesIds) },
        { state: state, warehouse: warehouseWhere },
      );

      if (result.affected === 0) {
        throw new Error('Ошибка при попытке перемещения картриджа');
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
        select: { id: true, createdAt: true },
        where: {
          model: { id: model.id },
          warehouse: { id: warehouse.id },
          state: In[CartridgeStatus.RECEIVED || CartridgeStatus.MOVED],
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
        throw new Error('Ошибка при попытке выдачи картриджа');
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
        select: { id: true, createdAt: true },
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
        throw new Error('Нет картриджей для списания');
      } else if (cartridgeToDecommissioning.length < count) {
        throw new Error('Нет такого количества картриджей для списания');
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

  async getCartridgesById(
    warehouseId: number,
  ): Promise<GetResponseAllCartridgeInWarehouseDto[]> {
    return await this.repoCartridges.find({
      where: {
        warehouse: { id: warehouseId },
        state: In([CartridgeStatus.RECEIVED, CartridgeStatus.MOVED]),
      },
      relations: { warehouse: true, model: true },
    });
  }
}
