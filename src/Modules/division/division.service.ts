import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Division } from '@Modules/division/entities/Division';
import { SuccessResponseDto } from '@common/dto/SuccessResponseDto';
import { PostCreateDivisionDto } from '@Modules/division/dto/PostCreateDivisionDto';
import { GetReponseAllDivisionDto } from '@Modules/division/dto/GetReponseAllDivisionDto';
import { RequiredFindOptionsSelect } from '@common/utils/typesUtils';

@Injectable()
export class DivisionService {
  constructor(
    @InjectRepository(Division)
    private readonly repo: Repository<Division>,
  ) {}

  async create(dto: PostCreateDivisionDto): Promise<SuccessResponseDto> {
    await this.repo.insert(dto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Подразделение успешно добавлено',
    };
  }

  async getAll(): Promise<GetReponseAllDivisionDto[]> {
    const select: RequiredFindOptionsSelect<GetReponseAllDivisionDto> = {
      id: true,
      name: true,
      location: true,
    };

    return await this.repo.find({
      select,
    });
  }
}
