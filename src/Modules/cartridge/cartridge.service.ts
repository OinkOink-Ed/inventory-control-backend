import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cartridge } from 'src/Modules/cartridge/entities/Cartridge';
import { DataSource, Repository } from 'typeorm';
import { RequsestCreateCartridgeDto } from './dto/RequsestCreateCartridgeDto';
import { RequestGetAllCartridgeInWarehouseDto } from './dto/RequestGetAllCartridgeInWarehouseDto';
import { ResponseGetAllCartridgeInWarehouseDto } from './dto/ResponseGetAllCartridgeInWarehouseDto';

@Injectable()
export class CartridgesService {
  constructor(
    @InjectRepository(Cartridge)
    private readonly repoCartridges: Repository<Cartridge>,
    private readonly dataSourse: DataSource,
  ) {}

  async createMany(dto: RequsestCreateCartridgeDto) {
    const { count, ...restDto } = dto;

    const queryRunner = this.dataSourse.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      for (let i = 0; i < count; i++) {
        await queryRunner.manager.save(Cartridge, restDto);
      }

      await queryRunner.commitTransaction();
      return true;
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
        model: true,
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
      model: cartridge.model,
      state: cartridge.state,
      warehouse: {
        id: cartridge.warehouse.id,
        name: cartridge.warehouse.name,
      },
      createdAt: cartridge.createdAt,
    }));
  }
}
