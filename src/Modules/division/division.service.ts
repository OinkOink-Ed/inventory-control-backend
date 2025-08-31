import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Division } from '@Modules/division/entities/Division';
import { SuccessResponseDto } from '@common/dto/SuccessResponseDto';
import { PostCreateDivisionDto } from '@Modules/division/dto/PostCreateDivisionDto';
import { GetReponseAllDivisionDto } from '@Modules/division/dto/GetReponseAllDivisionDto';
import { RequiredFindOptionsSelect } from '@common/utils/typesUtils';
import { UserService } from '@Modules/user/user.service';
import { UserData } from '@common/decorators/types/UserType';

@Injectable()
export class DivisionService {
  constructor(
    @InjectRepository(Division)
    private readonly repo: Repository<Division>,
    private readonly usersService: UserService,
  ) {}

  async create(dto: PostCreateDivisionDto): Promise<SuccessResponseDto> {
    await this.repo.insert(dto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Подразделение успешно добавлено',
    };
  }

  async getDivisions(userData: UserData): Promise<GetReponseAllDivisionDto[]> {
    const select: RequiredFindOptionsSelect<GetReponseAllDivisionDto> = {
      id: true,
      name: true,
      location: true,
    };

    if (userData.role.roleName !== 'user') {
      return await this.repo.find({
        select,
      });
    }

    const divisionIds = await this.usersService.getDivisionOfUser(userData.id);

    const res = await this.repo.find({
      select,
      where: {
        id: In(divisionIds),
      },
    });
    return res;
  }
}
