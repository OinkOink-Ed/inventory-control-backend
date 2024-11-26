import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/common/entities/role';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/createRoleDto';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private readonly repo: Repository<Role>
    ) { }

    async create(dto: CreateRoleDto) {
        await this.repo.insert(dto)
    }
}
