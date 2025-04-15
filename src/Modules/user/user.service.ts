import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/User';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ReadUserDto } from './dto/ReadUserDto';
import { CreateUserDto } from 'src/Modules/user/dto/CreateUserDto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    const salt = await bcrypt.genSalt(10);

    dto.password = await bcrypt.hash(dto.password, salt);

    console.log(dto);

    return await this.repo.insert(dto);
  }

  async findOneForAuth(nickname: string): Promise<User | undefined> {
    return await this.repo.findOne({
      where: {
        username: `${nickname}`,
      },
      select: {
        id: true,
        name: true,
        username: true,
        patronimyc: true,
        lastname: true,
        password: true,
        role: {
          roleName: true,
        },
      },
    });
  }

  async findOne(nickname: string): Promise<ReadUserDto | undefined> {
    return await this.repo.findOne({
      where: {
        username: `${nickname}`,
      },

      select: {
        id: true,
        name: true,
        username: true,
        patronimyc: true,
        lastname: true,
        // role: {
        //   roleName: true,
        // },
      },
    });
  }

  async getAll(): Promise<ReadUserDto[]> {
    return await this.repo.find({
      select: {
        id: true,
        name: true,
        username: true,
        patronimyc: true,
        lastname: true,

        //Исправить после доабвления отноешния в сущность

        // role: {
        //   id: true,
        //   roleName: true,
        // },
      },
      relations: ['role'],
    });
  }
}
