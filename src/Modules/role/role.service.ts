import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/common/entities/role';
import { Repository } from 'typeorm';
import { CreateRoleDto, RoleResponsWhithUserDto } from './dto/createRoleDto';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private readonly repo: Repository<Role>
    ) { }

    async create(dto: CreateRoleDto) {
        return await this.repo.insert(dto)
    }

    async getAll(): Promise<RoleResponsWhithUserDto[]> {
        return await this.repo.find({
            select: {
                id: true,
                roleName: true
            },
        });
    }
}
