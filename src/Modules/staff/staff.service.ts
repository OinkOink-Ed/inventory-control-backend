import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from './entities/Staff';
import { FindOptionsSelect, Repository } from 'typeorm';
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
    const select: FindOptionsSelect<GetResponseAllStaffDto> = {
      id: true,
      lastname: true,
      name: true,
      patronimyc: true,
      financiallyResponsiblePerson: true,
    };

    return await this.repo.find({
      select,
    });
  }

  async getDeteiledById(id: number): Promise<GetResponseDetailedStaffById[]> {
    const selectFields: (keyof GetResponseDetailedStaffById)[] = [
      'count',
      'division',
      'id',
      'kabinet',
      'model',
    ];

    const fieldToSqlMap: Record<keyof GetResponseDetailedStaffById, string> = {
      count: 'COUNT(action.id) AS count',
      division: 'division.name AS division',
      id: 'delivery.id AS id',
      kabinet: 'kabinet.number AS kabinet',
      model: 'model.name AS model',
    };

    const selectExpressions = selectFields.map((field) => fieldToSqlMap[field]);

    const query = this.repo
      .createQueryBuilder('staff')
      .leftJoinAndSelect('staff.acceptedCartridge', 'delivery')
      .leftJoin('delivery.kabinet', 'kabinet')
      .leftJoin('delivery.division', 'division')
      .leftJoin('delivery.action', 'action')
      .leftJoin('action.cartridge', 'cartridge')
      .leftJoin('cartridge.model', 'model')
      .where('staff.id = :id', { id })
      .select(selectExpressions)
      .groupBy('delivery.id, kabinet.number, division.name, model.name');

    return await query.getRawMany<GetResponseDetailedStaffById>();
  }
}
