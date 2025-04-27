import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Kabinet } from '@Modules/kabinet/entities/Kabinet';
import { SuccessResponseDto } from '@common/dto/SuccessResponseDto';
import { GetResponseAllKabinetDto } from '@Modules/kabinet/dto/GetResponseAllKabinetDto';
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

  async getAll(): Promise<GetResponseAllKabinetDto[]> {
    const kabinets = await this.repo.find();

    const plainKabinets = kabinets.map((warehouse) =>
      instanceToPlain(warehouse, { exposeUnsetFields: false }),
    );

    return plainToInstance(GetResponseAllKabinetDto, plainKabinets, {
      excludeExtraneousValues: true,
    });
  }
}
