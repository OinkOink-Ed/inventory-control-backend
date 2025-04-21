import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Kabinet } from 'src/Modules/kabinet/entities/Kabinet';
import { Repository } from 'typeorm';
import { SuccessResponse } from 'src/common/dto/SuccessResponseDto';
import { PostCreateKabinetDto } from './dto/PostCreateKabinetDto';
import { GetResponseAllKabinetDto } from './dto/GetResponseAllKabinetDto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class KabinetService {
  constructor(
    @InjectRepository(Kabinet)
    private readonly repo: Repository<Kabinet>,
  ) {}

  async create(dto: PostCreateKabinetDto): Promise<SuccessResponse> {
    await this.repo.insert(dto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Кабинет успешно добавлен',
    };
  }

  async getAll(): Promise<GetResponseAllKabinetDto[]> {
    const kabinets = await this.repo.find();

    return plainToInstance(GetResponseAllKabinetDto, kabinets, {
      excludeExtraneousValues: true,
    });
  }
}
