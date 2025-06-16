import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { User } from '@Modules/user/entities/User';
import { PostCreateUserDto } from '@Modules/user/dto/PostCreateUserDto';
import { SuccessResponseDto } from '@common/dto/SuccessResponseDto';
import { PostCreateAdminDto } from '@Modules/user/dto/PostCreateAdminDto';
import { ServiceForAuthFindUserDto } from '@Modules/user/service/ServiceForAuthFindUserDto';
import { GetResponseAllUserDto } from '@Modules/user/dto/GetResponseAllUserDto';
import { ServiceFindUserDto } from '@Modules/user/service/ServiceFindUserDto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async createUser(dto: PostCreateUserDto): Promise<SuccessResponseDto> {
    const salt = await bcrypt.genSalt(10);

    dto.password = await bcrypt.hash(dto.password, salt);

    await this.repo.insert(dto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Пользователь успешно добавлен',
    };
  }

  async createAdmin(dto: PostCreateAdminDto): Promise<SuccessResponseDto> {
    const salt = await bcrypt.genSalt(10);

    dto.password = await bcrypt.hash(dto.password, salt);

    await this.repo.insert(dto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Пользователь успешно добавлен',
    };
  }

  async findOneForAuth(username: string): Promise<ServiceForAuthFindUserDto> {
    const user = await this.repo.findOne({
      where: {
        username: `${username}`,
      },
      relations: ['role'],
    });

    return plainToInstance(ServiceForAuthFindUserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(userId: number): Promise<ServiceFindUserDto> {
    const user = await this.repo.findOne({
      where: {
        id: userId,
      },
      relations: ['role'],
    });

    return plainToInstance(ServiceFindUserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async getAll(): Promise<GetResponseAllUserDto[]> {
    return await this.repo.find({
      select: {
        id: true,
        name: true,
        lastname: true,
        patronimyc: true,
        username: true,
        state: true,
        division: { id: true, name: true },
        role: { id: true, roleName: true },
      },
      relations: ['role', 'division'],
    });
  }
}
