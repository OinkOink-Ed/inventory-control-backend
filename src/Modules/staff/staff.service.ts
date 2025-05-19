import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from './entities/Staff';
import { Repository } from 'typeorm';
import { PostCreateStaffDto } from './dto/PostCreateStaffDto';
import { SuccessResponseDto } from '@common/dto/SuccessResponseDto';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { GetResponseAllStaffDto } from './dto/GetResponseAllStaffDto';

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
    const staffs = await this.repo.find({
      select: {
        id: true,
        name: true,
        lastname: true,
        patronimyc: true,
      },
    });

    const plainCartridges = staffs.map((staff) =>
      instanceToPlain(staff, { exposeUnsetFields: false }),
    );

    return plainToInstance(GetResponseAllStaffDto, plainCartridges, {
      excludeExtraneousValues: true,
    });
  }
}
