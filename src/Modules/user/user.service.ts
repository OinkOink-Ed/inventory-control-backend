import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/User';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SuccessResponseDto } from 'src/common/dto/SuccessResponseDto';
import { PostCreateuserDto } from './dto/PostCreateUserDto';
import { ServiceForAuthFindUserDto } from './dto/ServiceForAuthFindUserDto';
import { GetResponseAllUserDto } from './dto/GetResponseAllUserDto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async create(dto: PostCreateuserDto): Promise<SuccessResponseDto> {
    const salt = await bcrypt.genSalt(10);

    dto.password = await bcrypt.hash(dto.password, salt);

    console.log(dto);

    await this.repo.insert(dto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Пользователь успешно добавлен',
    };
  }

  async findOneForAuth(nickname: string): Promise<ServiceForAuthFindUserDto> {
    const user = await this.repo.findOne({
      where: {
        username: `${nickname}`,
      },
      relations: ['role'],
    });

    return plainToInstance(ServiceForAuthFindUserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  // async findOne(nickname: string): Promise<ReadUserDto | undefined> {
  //   return await this.repo.findOne({
  //     where: {
  //       username: `${nickname}`,
  //     },
  //     select: {
  //       id: true,
  //       name: true,
  //       username: true,
  //       patronimyc: true,
  //       lastname: true,
  //       role: {
  //         id: true,
  //         roleName: true,
  //       },
  //     },
  //     relations: ['role'],
  //   });
  // }

  async getAll(): Promise<GetResponseAllUserDto[]> {
    const users = await this.repo.find({
      relations: ['role'],
    });

    return plainToInstance(GetResponseAllUserDto, users, {
      excludeExtraneousValues: true,
    });
  }
}
