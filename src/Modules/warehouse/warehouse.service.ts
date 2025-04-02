import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWarehouseDto } from './dto/CreateWarehouseDto';
import {
  ReadWarehouseDetailedDto,
  ReadWarehouseDto,
} from './dto/ReadWarehouseDto';
import { Warehouse } from 'src/common/entities/Warehouse';

@Injectable()
export class WarehouseService {
  constructor(
    @InjectRepository(Warehouse)
    private readonly repo: Repository<Warehouse>,
  ) {}

  async create(dto: CreateWarehouseDto) {
    return await this.repo.save(dto);
  }

  async getAll(): Promise<ReadWarehouseDto[]> {
    return await this.repo.find();
  }

  //После добавления отношения нужно будет скорректировать
  async getAllDetailed(): Promise<ReadWarehouseDetailedDto[]> {
    return await this.repo
      .find

      // {
      //   select: {
      //     creatorId: {
      //       id: true,
      //       surname: true,
      //       name: true,
      //       patronimyc: true,
      //     },
      //   },
      //   relations: ['creator'],
      // }
      ();
  }
}
