import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Warehouse } from 'src/Modules/warehouse/entities/Warehouse';
import { SuccessResponse } from 'src/common/dto/SuccessResponseDto';
import { GetResponseAllDetailedWarehouseDto } from './dto/GetResponseAllDetailedWarehouseDto';
import { PostCreateWarehouseDto } from './dto/PostCreateWarehouseDto';
import { GetResponseAllWarehouseDto } from './dto/GetResponseAllWarehouseDto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class WarehouseService {
  constructor(
    @InjectRepository(Warehouse)
    private readonly repo: Repository<Warehouse>,
  ) {}

  async create(dto: PostCreateWarehouseDto): Promise<SuccessResponse> {
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

    return plainToInstance(
      GetResponseAllDetailedWarehouseDto,
      warehousesDetailed,
      {
        excludeExtraneousValues: true,
      },
    );
  }
}
