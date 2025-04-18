import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Warehouse } from 'src/Modules/warehouse/entities/Warehouse';
import { WarehouseBaseRequestDto } from './dto/WarehouseBaseRequestDto';
import { SuccessResponse } from 'src/common/dto/SuccessResponseDto';
import { ResponseGetAllWarehouseDto } from './dto/ResponseGetAllWarehouseDto';
import { SelectFields } from 'types/utils';
import { ResponseGetAllDetailedWarehouseDto } from './dto/ResponseGetAllDetailedWarehouseDto';
import { ErrorResponseDto } from 'src/common/dto/ErrorResponseDto';

@Injectable()
export class WarehouseService {
  constructor(
    @InjectRepository(Warehouse)
    private readonly repo: Repository<Warehouse>,
  ) {}

  async create(
    dto: WarehouseBaseRequestDto,
  ): Promise<SuccessResponse | ErrorResponseDto> {
    await this.repo.save(dto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Модель картриджа успешно добавлена',
    };
  }

  async getAll(): Promise<ResponseGetAllWarehouseDto[] | ErrorResponseDto> {
    const select: SelectFields<ResponseGetAllWarehouseDto> = {
      id: true,
    };

    return await this.repo.find({
      select,
    });
  }

  async getAllDetailed(): Promise<
    ResponseGetAllDetailedWarehouseDto[] | ErrorResponseDto
  > {
    const select: SelectFields<ResponseGetAllDetailedWarehouseDto> = {
      id: true,
      name: true,
      creator: {
        id: true,
        lastname: true,
        name: true,
        patronimyc: true,
      },
    };

    return await this.repo.find({
      select,
      relations: ['creator'],
    });
  }
}
