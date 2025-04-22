import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cartridge } from 'src/Modules/cartridge/entities/Cartridge';
import { QueryRunner, Repository } from 'typeorm';
import { ServiceCreateCartridge } from './interfaces/ServiceCreateCartridge';
import { GetAllCartridgeInWarehouseDto } from './dto/GetAllCartridgeInWarehouseDto';
import { GetResponseAllCartridgeInWarehouseDto } from './dto/GetResponseAllCartridgeInWarehouseDto';
import { plainToInstance } from 'class-transformer';
import { ServiceMoveCartridge } from './service/ServiceMoveCartridge';
import { CartridgeRawResult } from './interfaces/CartridgeRawResult';
import { ServiceDecommissioningCartridge } from './service/ServiceDecommissioningCartridge';
import { CartridgeStatus } from 'src/common/enums/CartridgeStatus';

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
      //Так быстрее если не много
      const result = await queryRunner.manager.insert(Cartridge, dtos);

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

      const cartridgeToUpdate = (await queryRunner.manager
        .createQueryBuilder(Cartridge, 'cartridge')
        .select('cartridge.id')
        .where(
          'cartridge.model = :model AND cartridge.warehouse = :warehouseFrom',
          {
            model,
            warehouseFrom,
          },
        )
        .orderBy('cartridge.createdAt', 'ASC')
        .take(count)
        .getRawMany()) as CartridgeRawResult[];

      if (cartridgeToUpdate.length === 0) {
        //Придумать как давать ответ
      }

      const updatesIds: Array<number> = cartridgeToUpdate.map(
        (row) => row.cartridge_id,
      );

      const result = await queryRunner.manager
        .createQueryBuilder()
        .update(Cartridge)
        .set({
          warehouse: { id: warehouseWhere },
          state: CartridgeStatus.MOVED,
        })
        .where('id IN (:...ids)', { ids: updatesIds })
        .execute();

      if (result.affected === 0) {
        throw new Error('Ошибка при попытке перемещения картриджа');
      }

      return updatesIds;
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

      const cartridgeToDecommissioning = (await queryRunner.manager
        .createQueryBuilder(Cartridge, 'cartridge')
        .select('cartridge.id')
        .where(
          'cartridge.model = :model AND cartridge.warehouse = :warehouse',
          {
            model,
            warehouse,
          },
        )
        .orderBy('cartridge.createdAt', 'ASC')
        .take(count)
        .getRawMany()) as CartridgeRawResult[];

      if (cartridgeToDecommissioning.length === 0) {
        //Придумать как давать ответ
      }

      const decommissioningIds: Array<number> = cartridgeToDecommissioning.map(
        (row) => row.cartridge_id,
      );

      const result = await queryRunner.manager
        .createQueryBuilder()
        .update(Cartridge)
        .set({ state: CartridgeStatus.DECOMMISSIONED, deletedAt: new Date() })
        .where('id IN (:...ids)', { ids: decommissioningIds })
        .execute();

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
    return plainToInstance(GetResponseAllCartridgeInWarehouseDto, cartridges, {
      excludeExtraneousValues: true,
    });
  }
}
