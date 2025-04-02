import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/common/entities/Role';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/createRoleDto';
import { ReadRoleDto } from './dto/ReadRoleDto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly repo: Repository<Role>,
  ) {}

  async create(dto: CreateRoleDto) {
    return await this.repo.insert(dto);
  }

  async getAll(): Promise<ReadRoleDto[]> {
    return await this.repo.find();
  }
}
