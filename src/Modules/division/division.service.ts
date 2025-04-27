import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Division } from '@Modules/division/entities/Division';
import { SuccessResponseDto } from '@common/dto/SuccessResponseDto';
import { PostCreateDivisionDto } from '@Modules/division/dto/PostCreateDivisionDto';
import { GetReponseAllDivisionDto } from '@Modules/division/dto/GetReponseAllDivisionDto';

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
    const divisions = await this.repo.find();

    const plainDivisions = divisions.map((warehouse) =>
      instanceToPlain(warehouse, { exposeUnsetFields: false }),
    );

    return plainToInstance(GetReponseAllDivisionDto, plainDivisions, {
      excludeExtraneousValues: true,
    });
  }
}
