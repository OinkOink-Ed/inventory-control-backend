import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, QueryRunner, Repository } from 'typeorm';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Cartridge } from '@Modules/cartridge/entities/Cartridge';
import { ServiceCreateCartridge } from '@Modules/cartridge/service/ServiceCreateCartridge';
import { ServiceMoveCartridge } from '@Modules/cartridge/service/ServiceMoveCartridge';
import { ServiceDeliveryCartridge } from '@Modules/cartridge/service/ServiceDeliveryCartridge';
import { ServiceDecommissioningCartridge } from '@Modules/cartridge/service/ServiceDecommissioningCartridge';
import { GetAllCartridgeInWarehouseDto } from '@Modules/cartridge/dto/GetAllCartridgeInWarehouseDto';
import { GetResponseAllCartridgeInWarehouseDto } from '@Modules/cartridge/dto/GetResponseAllCartridgeInWarehouseDto';
import { CartridgeStatus } from '@common/enums/CartridgeStatus';

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
    const dtos = Array(count).fill(restDto);
    try {
      const cartridgeRepo = queryRunner.manager.getRepository(Cartridge);

      //Так быстрее если не много
      const result = await cartridgeRepo.insert(dtos);

      const createdIds: Array<{ id: number }> = result.identifiers.map(
        (idObj) => idObj.id,
      );

      await queryRunner.commitTransaction();
      return createdIds;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async moveMany(dto: ServiceMoveCartridge, queryRunner: QueryRunner) {
    try {
      const { count, model, warehouseFrom, warehouseWhere } = dto;

      const cartridgeRepo = queryRunner.manager.getRepository(Cartridge);

      const cartridgeToUpdate = await cartridgeRepo.find({
        select: ['id'],
        where: {
          model,
          warehouse: warehouseFrom,
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
        { state: CartridgeStatus.MOVED, warehouse: warehouseWhere },
      );

      if (result.affected === 0) {
        throw new Error('Ошибка при попытке перемещения картриджа');
      }

      return updatesIds;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }

  async deliveryMany(dto: ServiceDeliveryCartridge, queryRunner: QueryRunner) {
    try {
      const { count, model, warehouse } = dto;

      const cartridgeRepo = queryRunner.manager.getRepository(Cartridge);
      const cartridgeToDelivery = await cartridgeRepo.find({
        select: ['id'],
        where: {
          model,
          warehouse,
        },
        order: {
          createdAt: 'ASC',
        },
        take: count,
      });

      if (cartridgeToDelivery.length === 0) {
        throw new Error('Нет картриджей для выдачи');
      } else if (cartridgeToDelivery.length === count) {
        throw new Error('Нет такого количества картриджей для выдачи');
      }

      const deliveryIds: Array<number> = cartridgeToDelivery.map(
        (row) => row.id,
      );

      const result = await cartridgeRepo.update(
        { id: In(deliveryIds) },
        { state: CartridgeStatus.ISSUED, deletedAt: new Date() },
      );

      if (result.affected === 0) {
        throw new Error('Ошибка при попытке выдачи картриджа');
      }

      return deliveryIds;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }

  async decommissioningMany(
    dto: ServiceDecommissioningCartridge,
    queryRunner: QueryRunner,
  ) {
    try {
      const { count, model, warehouse } = dto;

      const cartridgeRepo = queryRunner.manager.getRepository(Cartridge);

      const cartridgeToDecommissioning = await cartridgeRepo.find({
        select: ['id'],
        where: {
          model,
          warehouse,
        },
        order: {
          createdAt: 'ASC',
        },
        take: count,
      });

      if (cartridgeToDecommissioning.length === 0) {
        throw new Error('Нет картриджей для списания');
      } else if (cartridgeToDecommissioning.length === count) {
        throw new Error('Нет такого количества картриджей для списания');
      }

      const decommissioningIds: Array<number> = cartridgeToDecommissioning.map(
        (row) => row.id,
      );

      const result = await cartridgeRepo.update(
        { id: In(decommissioningIds) },
        { state: CartridgeStatus.DECOMMISSIONED, deletedAt: new Date() },
      );

      if (result.affected === 0) {
        throw new Error('Ошибка при попытке списания картриджа');
      }

      return decommissioningIds;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }

  async getAll(
    dto: GetAllCartridgeInWarehouseDto,
  ): Promise<GetResponseAllCartridgeInWarehouseDto[]> {
    const cartridges = await this.repoCartridges.find({
      where: {
        warehouse: { id: dto.warehouse.id },
      },
      relations: ['warehouse', 'model'],
    });

    const plainCartridges = cartridges.map((warehouse) =>
      instanceToPlain(warehouse, { exposeUnsetFields: false }),
    );

    return plainToInstance(
      GetResponseAllCartridgeInWarehouseDto,
      plainCartridges,
      {
        excludeExtraneousValues: true,
      },
    );
  }
}
