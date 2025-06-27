import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsSelect, Repository } from 'typeorm';
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
    const select: FindOptionsSelect<GetResponseAllWarehouseDto> = {
      id: true,
      name: true,
    };

    return await this.repo.find({ select });
  }

  async getDetailedByWarehouseId(
    warehouseId: number,
  ): Promise<GetResponseAllDetailedWarehouseDto[]> {
    // Определяем поля для select
    const selectFields: (keyof GetResponseAllDetailedWarehouseDto)[] = [
      'divisionId',
      'kabinetId',
      'number',
    ];

    // Объект маппинга полей DTO на SQL-выражения
    //Record - ключи использует из DTO, и указывает тип значения ключа
    const fieldToSqlMap: Record<
      keyof GetResponseAllDetailedWarehouseDto,
      string
    > = {
      divisionId: 'division.id AS divisionId',
      kabinetId: 'kabinet.id AS kabinetId',
      number: 'kabinet.number AS number',
    };

    // Формируем SQL-выражения
    const selectExpressions = selectFields.map((field) => fieldToSqlMap[field]);

    const result = this.repo
      .createQueryBuilder('warehouse')
      .leftJoinAndSelect('warehouse.division', 'division')
      .leftJoin('division.kabinets', 'kabinet')
      .select(selectExpressions)
      .where('warehouse.id = :id', { id: warehouseId });

    return result.getRawMany<GetResponseAllDetailedWarehouseDto>();
  }
}
