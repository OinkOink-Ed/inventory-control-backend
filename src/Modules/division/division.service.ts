import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SuccessResponse } from 'src/common/dto/SuccessResponseDto';
import { DivisionBaseRequestDto } from 'src/Modules/division/dto/DivisionBaseRequestDto';
import { Division } from 'src/Modules/division/entities/Division';
import { Repository } from 'typeorm';
import { ResponseGetAllDivision } from './dto/ResponseGetAllDivision';
import { SelectFields } from 'types/utils';
import { ErrorResponseDto } from 'src/common/dto/ErrorResponseDto';

@Injectable()
export class DivisionService {
  constructor(
    @InjectRepository(Division)
    private readonly repo: Repository<Division>,
  ) {}

  async create(
    dto: DivisionBaseRequestDto,
  ): Promise<SuccessResponse | ErrorResponseDto> {
    await this.repo.insert(dto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Подразделение успешно добавлено',
    };
  }

  async getAll(): Promise<ResponseGetAllDivision[] | ErrorResponseDto> {
    const select: SelectFields<ResponseGetAllDivision> = {
      id: true,
      name: true,
    };

    return await this.repo.find({
      select,
    });
  }
}
