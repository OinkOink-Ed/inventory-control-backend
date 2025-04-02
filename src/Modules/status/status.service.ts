import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/common/entities/Status';
import { Repository } from 'typeorm';
import { CreateStatusDto } from './dto/CreateStatusDto';
import { ReadStatusDto } from './dto/ReadStatusDto';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status)
    private readonly repo: Repository<Status>,
  ) {}

  async create(dto: CreateStatusDto) {
    return await this.repo.insert(dto);
  }

  async getAll(): Promise<ReadStatusDto[]> {
    return await this.repo.find();
  }
}
