import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Kabinet } from '@Modules/kabinet/entities/Kabinet';
import { SuccessResponseDto } from '@common/dto/SuccessResponseDto';
import { GetResponseKabinetsDto } from '@Modules/kabinet/dto/GetResponseKabinetsDto';
import { PostCreateKabinetDto } from '@Modules/kabinet/dto/PostCreateKabinetDto';
import { RequiredFindOptionsSelect } from '@common/utils/typesUtils';
import { UserData } from '@common/decorators/types/UserType';
import { UserService } from '@Modules/user/user.service';

@Injectable()
export class KabinetService {
  constructor(
    @InjectRepository(Kabinet)
    private readonly repo: Repository<Kabinet>,
    private readonly usersService: UserService,
  ) {}

  async create(dto: PostCreateKabinetDto): Promise<SuccessResponseDto> {
    await this.repo.insert(dto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Кабинет успешно добавлен',
    };
  }

  async getKAbinetsByDivisionId(
    divisionid: number,
    userData: UserData,
  ): Promise<GetResponseKabinetsDto[]> {
    const select: RequiredFindOptionsSelect<GetResponseKabinetsDto> = {
      id: true,
      division: { name: true },
      number: true,
      createdAt: true,
    };

    if (userData.role.roleName !== 'user') {
      return await this.repo.find({
        where: { division: { id: divisionid } },
        select,
        relations: { division: true },
      });
    }

    const divisionIds = await this.usersService.getDivisionOfUser(userData.id);

    return await this.repo.find({
      where: { division: { id: In(divisionIds) } },
      select,
      relations: { division: true },
    });
  }
}
