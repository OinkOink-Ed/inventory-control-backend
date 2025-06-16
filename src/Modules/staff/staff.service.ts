import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from './entities/Staff';
import { Repository } from 'typeorm';
import { PostCreateStaffDto } from './dto/PostCreateStaffDto';
import { SuccessResponseDto } from '@common/dto/SuccessResponseDto';
import { GetResponseAllStaffDto } from './dto/GetResponseAllStaffDto';
import { GetResponseDetailedStaffById } from './dto/GetResponseDetailedStaffById';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private readonly repo: Repository<Staff>,
  ) {}

  async createStaff(dto: PostCreateStaffDto): Promise<SuccessResponseDto> {
    await this.repo.insert(dto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Персонал успешно добавлен',
    };
  }

  async getAll(): Promise<GetResponseAllStaffDto[]> {
    return await this.repo.find({
      select: {
        id: true,
        lastname: true,
        name: true,
        patronimyc: true,
        financiallyResponsiblePerson: true,
      },
    });
  }

  async getDeteiledById(id: number): Promise<GetResponseDetailedStaffById[]> {
    const query = this.repo
      .createQueryBuilder('staff')
      .leftJoinAndSelect('staff.acceptedCartridge', 'delivery')
      .leftJoin('delivery.kabinet', 'kabinet')
      .leftJoin('delivery.division', 'division')
      .leftJoin('delivery.action', 'action')
      .leftJoin('action.cartridge', 'cartridge')
      .leftJoin('cartridge.model', 'model')
      .where('staff.id = :id', { id })
      .select([
        'delivery.id AS id',
        'kabinet.number AS kabinet',
        'division.name AS division',
        'model.name AS model',
        'COUNT(action.id) AS count',
      ])
      .groupBy('delivery.id, kabinet.number, division.name, model.name');

    return await query.getRawMany<GetResponseDetailedStaffById>();
  }
}
