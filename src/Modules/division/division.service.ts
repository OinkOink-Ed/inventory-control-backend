import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SuccessResponseDto } from 'src/common/dto/SuccessResponseDto';
import { Division } from 'src/Modules/division/entities/Division';
import { Repository } from 'typeorm';
import { PostCreateDivisionDto } from './dto/PostCreateDivisionDto';
import { GetReponseAllDivisionDto } from './dto/GetReponseAllDivisionDto';
import { plainToInstance } from 'class-transformer';

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
    const devisions = await this.repo.find();

    return plainToInstance(GetReponseAllDivisionDto, devisions, {
      excludeExtraneousValues: true,
    });
  }
}
