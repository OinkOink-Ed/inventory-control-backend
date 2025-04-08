import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Division } from 'src/Modules/division/entities/Division';
import { Repository } from 'typeorm';
import { CreateDivisionDto } from './dto/CreateDivisionDto';
import { ReadDivisionDto } from './dto/ReadDivisionDto';

@Injectable()
export class DivisionService {
  constructor(
    @InjectRepository(Division)
    private readonly repo: Repository<Division>,
  ) {}

  async create(dto: CreateDivisionDto) {
    return await this.repo.insert(dto);
  }

  async getAll(): Promise<ReadDivisionDto[]> {
    return await this.repo.find();
  }
}
