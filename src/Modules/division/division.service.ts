import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SuccessResponse } from 'src/common/dto/SuccessResponseDto';
import { DivisionBaseRequestDto } from 'src/Modules/division/dto/DivisionBaseRequestDto';
import { Division } from 'src/Modules/division/entities/Division';
import { Repository } from 'typeorm';
import { ResponseGetAllDivision } from './dto/ResponseGetAllDivision';

@Injectable()
export class DivisionService {
  constructor(
    @InjectRepository(Division)
    private readonly repo: Repository<Division>,
  ) {}

  async create(dto: DivisionBaseRequestDto): Promise<SuccessResponse> {
    await this.repo.insert(dto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Подразделение успешно добавлено',
    };
  }

  async getAll(): Promise<ResponseGetAllDivision[]> {
    return await this.repo.find();
  }
}
