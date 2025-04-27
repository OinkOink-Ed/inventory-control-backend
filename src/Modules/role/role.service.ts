import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Role } from '@Modules/role/entities/Role';
import { SuccessResponseDto } from '@common/dto/SuccessResponseDto';
import { PostCreateroleDto } from '@Modules/role/dto/PostCreateRoleDto';
import { GetResponseAllRole } from '@Modules/role/dto/GetResponseAllRole';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly repo: Repository<Role>,
  ) {}

  async create(dto: PostCreateroleDto): Promise<SuccessResponseDto> {
    await this.repo.insert(dto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Роль успешно добавлена',
    };
  }

  async getAll(): Promise<GetResponseAllRole[]> {
    const roles = await this.repo.find();

    const plainRoles = roles.map((warehouse) =>
      instanceToPlain(warehouse, { exposeUnsetFields: false }),
    );

    return plainToInstance(GetResponseAllRole, plainRoles, {
      excludeExtraneousValues: true,
    });
  }
}
