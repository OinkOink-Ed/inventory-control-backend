import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cartridge } from 'src/Modules/cartridge/entities/Cartridge';
import { QueryRunner, Repository } from 'typeorm';
import { RequestGetAllCartridgeInWarehouseDto } from './dto/RequestGetAllCartridgeInWarehouseDto';
import { ResponseGetAllCartridgeInWarehouseDto } from './dto/ResponseGetAllCartridgeInWarehouseDto';
import { ServiceCreateCartridgeDto } from 'src/Modules/cartridge/dto/ServiceCreateCartridgeDto';

@Injectable()
export class CartridgeService {
  constructor(
    @InjectRepository(Cartridge)
    private readonly repoCartridges: Repository<Cartridge>,
  ) {}

  async createMany(dto: ServiceCreateCartridgeDto, queryRunner: QueryRunner) {
    const { count, ...restDto } = dto;

    // Создаем одинакоыве dto (занимаем память)
    const dtos = Array(count).fill(restDto);
    try {
      //Так быстрее если не много
      const result = await queryRunner.manager.insert(Cartridge, dtos);

      const createdIds = result.identifiers.map((idObj) => idObj.id);

      await queryRunner.commitTransaction();
      return createdIds;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getAll(
    dto: RequestGetAllCartridgeInWarehouseDto,
  ): Promise<ResponseGetAllCartridgeInWarehouseDto[]> {
    const cartridges = await this.repoCartridges.find({
      where: {
        warehouse: { id: dto.warehouse.id },
      },
      select: {
        id: true,
        model: {
          id: true,
          name: true,
        },
        state: true,
        warehouse: {
          id: true,
          name: true,
        },
        createdAt: true,
      },
    });

    return cartridges.map((cartridge) => ({
      id: cartridge.id,
      model: {
        id: cartridge.model.id,
        name: cartridge.model.name,
      },
      state: cartridge.state,
      warehouse: {
        id: cartridge.warehouse.id,
        name: cartridge.warehouse.name,
      },
      createdAt: cartridge.createdAt,
    }));
  }
}
