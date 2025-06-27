import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsSelect, Repository } from 'typeorm';
import { Kabinet } from '@Modules/kabinet/entities/Kabinet';
import { SuccessResponseDto } from '@common/dto/SuccessResponseDto';
import { GetResponseKabinetsDto } from '@Modules/kabinet/dto/GetResponseKabinetsDto';
import { PostCreateKabinetDto } from '@Modules/kabinet/dto/PostCreateKabinetDto';

@Injectable()
export class KabinetService {
  constructor(
    @InjectRepository(Kabinet)
    private readonly repo: Repository<Kabinet>,
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
  ): Promise<GetResponseKabinetsDto[]> {
    const select: FindOptionsSelect<GetResponseKabinetsDto> = {
      id: true,
      division: { name: true },
      number: true,
      createdAt: true,
    };

    return await this.repo.find({
      where: { division: { id: divisionid } },
      select,
      relations: { division: true },
    });
  }
}
