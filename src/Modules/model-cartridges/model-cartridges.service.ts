import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartridgeModels } from 'src/common/entities/cartridgeModels';
import { Repository } from 'typeorm';
import { CreateModelCartridgeDto } from './dto/CreateModelCartridgeDto';

@Injectable()
export class ModelCartridgesService {
  constructor(
    @InjectRepository(CartridgeModels)
    private readonly repo: Repository<CartridgeModels>,
  ) {}

  async create(dto: CreateModelCartridgeDto) {
    return await this.repo.save(dto);
  }

  async getAll() {
    return await this.repo.find({
      select: {
        creator: {
          id: true,
          surname: true,
          name: true,
          patronimyc: true,
        },
      },
      relations: ['creator'],
    });
  }
}
