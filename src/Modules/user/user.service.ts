import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '@Modules/user/entities/User';
import { PostCreateUserDto } from '@Modules/user/dto/PostCreateUserDto';
import { SuccessResponseDto } from '@common/dto/SuccessResponseDto';
import { PostCreateAdminDto } from '@Modules/user/dto/PostCreateAdminDto';
import { ServiceForAuthFindUser } from '@Modules/user/service/ServiceForAuthFindUser';
import { GetResponseAllUserDto } from '@Modules/user/dto/GetResponseAllUserDto';
import { RequiredFindOptionsSelect } from '@common/utils/typesUtils';
import { ServiceForFindUser } from './service/ServiceFindUser';

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

  async findOneForAuth(
    username: string,
  ): Promise<ServiceForAuthFindUser | null> {
    const select: RequiredFindOptionsSelect<ServiceForAuthFindUser> = {
      id: true,
      password: true,
      role: { roleName: true },
    };

    return await this.repo.findOne({
      where: {
        username: `${username}`,
      },
      select,
      relations: ['role'],
    });
  }

  async findOne(userId: number): Promise<ServiceForFindUser | null> {
    const select: RequiredFindOptionsSelect<ServiceForFindUser> = {
      id: true,
      role: { roleName: true },
    };

    return await this.repo.findOne({
      where: {
        id: userId,
      },
      select,
      relations: ['role'],
    });
  }

  async getAll(): Promise<GetResponseAllUserDto[]> {
    const select: RequiredFindOptionsSelect<GetResponseAllUserDto> = {
      id: true,
      name: true,
      lastname: true,
      patronimyc: true,
      username: true,
      state: true,
      division: { id: true, name: true },
      role: { id: true, roleName: true },
    };

    return await this.repo.find({
      select,
      relations: ['role', 'division'],
    });
  }
}
