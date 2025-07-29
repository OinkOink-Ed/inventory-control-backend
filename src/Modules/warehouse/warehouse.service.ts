import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Warehouse } from '@Modules/warehouse/entities/Warehouse';
import { PostCreateWarehouseDto } from '@Modules/warehouse/dto/PostCreateWarehouseDto';
import { SuccessResponseDto } from '@common/dto/SuccessResponseDto';
import { GetResponseAllWarehouseDto } from '@Modules/warehouse/dto/GetResponseAllWarehouseDto';
import { GetResponseAllDetailedWarehouseDto } from '@Modules/warehouse/dto/GetResponseAllDetailedWarehouseDto';
import { RequiredFindOptionsSelect } from '@common/utils/typesUtils';

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
    const select: RequiredFindOptionsSelect<GetResponseAllWarehouseDto> = {
      id: true,
      name: true,
    };

    return await this.repo.find({ select });
  }

  async getDetailedByWarehouseId(
    warehouseId: number,
  ): Promise<GetResponseAllDetailedWarehouseDto[]> {
    const select: RequiredFindOptionsSelect<GetResponseAllDetailedWarehouseDto> =
      {
        division: { id: true, kabinets: { id: true, number: true } },
      };

    return this.repo.find({ select, where: { id: warehouseId } });
  }
}
