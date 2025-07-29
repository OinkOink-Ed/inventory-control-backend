import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from './entities/Staff';
import { Repository } from 'typeorm';
import { PostCreateStaffDto } from './dto/PostCreateStaffDto';
import { SuccessResponseDto } from '@common/dto/SuccessResponseDto';
import { GetResponseAllStaffDto } from './dto/GetResponseAllStaffDto';
import { RequiredFindOptionsSelect } from '@common/utils/typesUtils';

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
    const select: RequiredFindOptionsSelect<GetResponseAllStaffDto> = {
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
}
