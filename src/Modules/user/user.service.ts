import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/User';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserBaseRequestDto } from './dto/UserBaseRequestDto';
import { ServiceForAuthFindUserDto } from './dto/ServiceForAuthFindUserDto';
import { SelectFields } from 'types/utils';
import { ResponseGetAllUserDto } from './dto/ResponseGetAllUserDto';
import { ErrorResponseDto } from 'src/common/dto/ErrorResponseDto';
import { SuccessResponse } from 'src/common/dto/SuccessResponseDto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async create(
    dto: UserBaseRequestDto,
  ): Promise<SuccessResponse | ErrorResponseDto> {
    const salt = await bcrypt.genSalt(10);

    dto.password = await bcrypt.hash(dto.password, salt);

    console.log(dto);

    await this.repo.insert(dto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Пользователь успешно добавлен',
    };
  }

  async findOneForAuth(
    nickname: string,
  ): Promise<ServiceForAuthFindUserDto | null> {
    const select: SelectFields<ServiceForAuthFindUserDto> = {
      id: true,
      name: true,
      username: true,
      patronimyc: true,
      lastname: true,
      password: true,
      role: {
        id: true,
        roleName: true,
      },
    };

    return await this.repo.findOne({
      where: {
        username: `${nickname}`,
      },
      select,
      relations: ['role'],
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

  async getAll(): Promise<ResponseGetAllUserDto[] | ErrorResponseDto> {
    const select: SelectFields<ServiceForAuthFindUserDto> = {
      id: true,
      name: true,
      username: true,
      patronimyc: true,
      lastname: true,
      password: true,
      role: {
        id: true,
        roleName: true,
      },
    };

    return await this.repo.find({
      select,
      relations: ['role'],
    });
  }
}
