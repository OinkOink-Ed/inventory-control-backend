import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Warehouse } from 'src/Modules/warehouse/entities/Warehouse';
import { WarehouseBaseResponseDto } from './dto/WarehouseBaseResponseDto';
import { WarehouseBaseRequestDto } from './dto/WarehouseBaseRequestDto';

@Injectable()
export class WarehouseService {
  constructor(
    @InjectRepository(Warehouse)
    private readonly repo: Repository<Warehouse>,
  ) {}

  async create(dto: WarehouseBaseRequestDto) {
    return await this.repo.save(dto);
  }

  async getAll(): Promise<WarehouseBaseResponseDto[]> {
    return await this.repo.find({
      select: {
        id: true,
      },
    });
  }

  //После добавления отношения нужно будет скорректировать
  async getAllDetailed(): Promise<WarehouseBaseResponseDto[]> {
    return await this.repo.find({
      select: {
        creator: {
          id: true,
          lastname: true,
          name: true,
          patronimyc: true,
        },
      },
      relations: ['creator'],
    });
  }
}
