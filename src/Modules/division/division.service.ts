import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SuccessResponse } from 'src/common/dto/SuccessResponseDto';
import { Division } from 'src/Modules/division/entities/Division';
import { Repository } from 'typeorm';
import { PostCreateDivisionDto } from './dto/PostCreateDivisionDto';
import { GetReponseAllDivision } from './dto/GetReponseAllDivision';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class DivisionService {
  constructor(
    @InjectRepository(Division)
    private readonly repo: Repository<Division>,
  ) {}

  async create(dto: PostCreateDivisionDto): Promise<SuccessResponse> {
    await this.repo.insert(dto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Подразделение успешно добавлено',
    };
  }

  async getAll(): Promise<GetReponseAllDivision[]> {
    const devisions = await this.repo.find();

    return plainToInstance(GetReponseAllDivision, devisions, {
      excludeExtraneousValues: true,
    });
  }
}
