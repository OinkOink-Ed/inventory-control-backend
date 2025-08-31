import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '@Modules/role/entities/Role';
import { SuccessResponseDto } from '@common/dto/SuccessResponseDto';
import { PostCreateroleDto } from '@Modules/role/dto/PostCreateRoleDto';
import { GetResponseAllRole } from '@Modules/role/dto/GetResponseAllRole';
import { RequiredFindOptionsSelect } from '@common/utils/typesUtils';
import { UserData } from '@common/decorators/types/UserType';

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

  async getRoles(userData: UserData): Promise<GetResponseAllRole[]> {
    const select: RequiredFindOptionsSelect<GetResponseAllRole> = {
      id: true,
      roleName: true,
    };

    if (userData.role.roleName !== 'user') {
      return await this.repo.find({ select });
    }

    return await this.repo.find({ select, where: { roleName: 'staff' } });
  }
}
