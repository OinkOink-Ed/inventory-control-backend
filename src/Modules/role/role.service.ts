import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/Modules/role/entities/Role';
import { Repository } from 'typeorm';
import { SuccessResponse } from 'src/common/dto/SuccessResponseDto';
import { RoleBaseRequest } from './dto/RoleBaseRequest';
import { ResponseGetAllRole } from './dto/ResponseGetAllRole';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly repo: Repository<Role>,
  ) {}

  async create(dto: RoleBaseRequest): Promise<SuccessResponse> {
    await this.repo.insert(dto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Роль успешно добавлена',
    };
  }

  async getAll(): Promise<ResponseGetAllRole[]> {
    return await this.repo.find({
      select: {
        id: true,
        roleName: true,
      },
    });
  }
}
