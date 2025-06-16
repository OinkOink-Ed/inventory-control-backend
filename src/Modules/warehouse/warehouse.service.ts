import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Warehouse } from '@Modules/warehouse/entities/Warehouse';
import { PostCreateWarehouseDto } from '@Modules/warehouse/dto/PostCreateWarehouseDto';
import { SuccessResponseDto } from '@common/dto/SuccessResponseDto';
import { GetResponseAllWarehouseDto } from '@Modules/warehouse/dto/GetResponseAllWarehouseDto';
import { GetResponseAllDetailedWarehouseDto } from '@Modules/warehouse/dto/GetResponseAllDetailedWarehouseDto';

@Injectable()
export class WarehouseService {
  constructor(
    @InjectRepository(Warehouse)
    private readonly repo: Repository<Warehouse>,
  ) {}

  async create(dto: PostCreateWarehouseDto): Promise<SuccessResponseDto> {
    await this.repo.save(dto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Модель картриджа успешно добавлена',
    };
  }

  async getAll(): Promise<GetResponseAllWarehouseDto[]> {
    return await this.repo.find({
      select: {
        id: true,
        name: true,
      },
    });
  }

  async getDetailedByWarehouseId(
    warehouseId: number,
  ): Promise<GetResponseAllDetailedWarehouseDto[]> {
    const result = this.repo
      .createQueryBuilder('warehouse')
      .leftJoinAndSelect('warehouse.division', 'division')
      .leftJoin('division.kabinets', 'kabinet')
      .select([
        'division.id AS divisionId',
        'kabinet.id AS kabinetId',
        'kabinet.number AS number',
      ])
      .where('warehouse.id = :id', { id: warehouseId });

    return result.getRawMany<GetResponseAllDetailedWarehouseDto>();
  }
}
