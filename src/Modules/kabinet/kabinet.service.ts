import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Kabinet } from 'src/Modules/kabinet/entities/Kabinet';
import { Repository } from 'typeorm';
import { KabinetBaseRequest } from './dto/KabinetBaserequest';
import { SuccessResponse } from 'src/common/dto/SuccessResponseDto';
import { ResponseGetAllKabinetDto } from './dto/ResponseGetAllKabinetDto';

@Injectable()
export class KabinetService {
  constructor(
    @InjectRepository(Kabinet)
    private readonly repo: Repository<Kabinet>,
  ) {}

  async create(dto: KabinetBaseRequest): Promise<SuccessResponse> {
    await this.repo.insert(dto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Кабинет успешно добавлен',
    };
  }

  async getAll(): Promise<ResponseGetAllKabinetDto[]> {
    return await this.repo.find({
      select: {
        id: true,
        number: true,
      },
    });
  }
}
