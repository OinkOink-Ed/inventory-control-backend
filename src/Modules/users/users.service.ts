import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../common/entities/user';
import { Repository } from 'typeorm';
import { UserResponseDto, CreateUserDto } from './dto/createUserDto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    const salt = await bcrypt.genSalt(10);

    dto.password = await bcrypt.hash(dto.password, salt);

    return await this.repo.save(dto);
  }

  async findOneForAuth(nickname: string): Promise<User | undefined> {
    return await this.repo.findOne({
      where: {
        nickname: `${nickname}`,
      },

      select: {
        id: true,
        name: true,
        nickname: true,
        patronimyc: true,
        surname: true,
        password: true,
        role: {
          roleName: true,
        },
      },
    });
  }

  async findOne(nickname: string): Promise<UserResponseDto | undefined> {
    return await this.repo.findOne({
      where: {
        nickname: `${nickname}`,
      },

      select: {
        id: true,
        name: true,
        nickname: true,
        patronimyc: true,
        surname: true,
        role: {
          roleName: true,
        },
      },
    });
  }

  async getAll(): Promise<UserResponseDto[]> {
    return await this.repo.find({
      select: {
        id: true,
        name: true,
        nickname: true,
        patronimyc: true,
        surname: true,
        role: {
          roleName: true,
        },
      },
      relations: ['role'],
    });
  }
}
