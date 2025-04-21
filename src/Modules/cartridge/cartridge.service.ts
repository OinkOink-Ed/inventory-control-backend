import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cartridge } from 'src/Modules/cartridge/entities/Cartridge';
import { QueryRunner, Repository } from 'typeorm';
import { ServiceCreateCartridge } from './interfaces/ServiceCreateCartridge';
import { GetAllCartridgeInWarehouseDto } from './dto/GetAllCartridgeInWarehouseDto';
import { GetResponseAllCartridgeInWarehouseDto } from './dto/GetResponseAllCartridgeInWarehouseDto';
// import { ServiceMoveCartridge } from './interfaces/ServiceMoveCartridge';
import { plainToInstance } from 'class-transformer';

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

  // async moveMany(queryRunner: QueryRunner, dto: ServiceMoveCartridge) {
  //   try {
  //   } catch (error) {
  //     await queryRunner.rollbackTransaction();
  //     throw error;
  //   } finally {
  //   }
  // }

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
