import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Kabinet } from 'src/common/entities/Kabinet';
import { Repository } from 'typeorm';
import { ReadKabinetDto } from './dto/ReadKabinetDto';
import { CreateKabinetDto } from './dto/CreateKabinetDto';

@Injectable()
export class KabinetService {
  constructor(
    @InjectRepository(Kabinet)
    private readonly repo: Repository<Kabinet>,
  ) {}

  async create(dto: CreateKabinetDto) {
    return await this.repo.insert(dto);
  }

  async getAll(): Promise<ReadKabinetDto[]> {
    return await this.repo.find();
  }
}
