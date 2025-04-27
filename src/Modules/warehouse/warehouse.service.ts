import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { instanceToPlain, plainToInstance } from 'class-transformer';
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
    const warehouses = await this.repo.find();

    return plainToInstance(GetResponseAllWarehouseDto, warehouses, {
      excludeExtraneousValues: true,
    });
  }

  async getAllDetailed(): Promise<GetResponseAllDetailedWarehouseDto[]> {
    const warehousesDetailed = await this.repo.find({
      relations: ['creator'],
    });

    const plainWarehousesDetailed = warehousesDetailed.map((warehouse) =>
      instanceToPlain(warehouse, { exposeUnsetFields: false }),
    );

    return plainToInstance(
      GetResponseAllDetailedWarehouseDto,
      plainWarehousesDetailed,
      {
        excludeExtraneousValues: true,
      },
    );
  }
}
