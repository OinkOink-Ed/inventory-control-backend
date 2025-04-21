import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/Modules/role/entities/Role';
import { Repository } from 'typeorm';
import { SuccessResponse } from 'src/common/dto/SuccessResponseDto';
import { PostCreateroleDto } from './dto/PostCreateRoleDto';
import { GetResponseAllRole } from './dto/GetResponseAllRole';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly repo: Repository<Role>,
  ) {}

  async create(dto: PostCreateroleDto): Promise<SuccessResponse> {
    await this.repo.insert(dto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Роль успешно добавлена',
    };
  }

  async getAll(): Promise<GetResponseAllRole[]> {
    const roles = await this.repo.find();

    return plainToInstance(GetResponseAllRole, roles, {
      excludeExtraneousValues: true,
    });
  }
}
