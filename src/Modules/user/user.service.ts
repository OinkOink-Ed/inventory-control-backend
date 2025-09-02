import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '@Modules/user/entities/User';
import { PostCreateUserDto } from '@Modules/user/dto/PostCreateUserDto';
import { SuccessResponseDto } from '@common/dto/SuccessResponseDto';
import { PostCreateAdminDto } from '@Modules/user/dto/PostCreateAdminDto';
import { ServiceForAuthFindUser } from '@Modules/user/service/ServiceForAuthFindUser';
import { GetResponseAllUserDto } from '@Modules/user/dto/GetResponseAllUserDto';
import { RequiredFindOptionsSelect } from '@common/utils/typesUtils';
import { ServiceForFindUser } from './service/ServiceFindUser';
import { ServiceFindUserForChoiseWarehouse } from './service/ServiceFindUserForChoiseWarehouse';
import { GetResponseAllUsersByDivisionsDto } from '@Modules/user/dto/GetResponseAllUsersByDivisionsDto';
import { GetResponseStaffDetailedDto } from '@Modules/user/dto/GetResponseStaffDetailedDto';
import { GetResponseStaffDetailedService } from '@Modules/user/ClassesForMapped/GetResponseStaffDetailedService';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { UserData } from '@common/decorators/types/UserType';

@Injectable()
export class UserService {
  constructor(
    @InjectMapper()
    private readonly mapper: Mapper,
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async getDivisionOfUser(userId: number): Promise<number[]> {
    const user = await this.findOneById(userId);

    if (!user)
      throw new BadRequestException('Такого пользователя не существует');

    const divisionIds = user?.division.map((item) => item.id);

    if (!divisionIds)
      throw new BadRequestException('У пользователя нет подразделений');

    return divisionIds;
  }

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

  async createStaff(dto: PostCreateAdminDto): Promise<SuccessResponseDto> {
    const salt = await bcrypt.genSalt(10);

    dto.password = await bcrypt.hash(dto.password, salt);

    await this.repo.insert(dto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Сотрудник успешно добавлен',
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

  async findOneById(
    userId: number,
  ): Promise<ServiceFindUserForChoiseWarehouse | null> {
    const select: RequiredFindOptionsSelect<ServiceFindUserForChoiseWarehouse> =
      {
        id: true,
        division: { id: true },
      };

    return await this.repo.findOne({
      where: { id: userId },
      select,
      relations: { division: true },
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

  async getAllByDivisions(
    userData: UserData,
    warehouseId: number,
  ): Promise<GetResponseAllUsersByDivisionsDto[]> {
    const select: RequiredFindOptionsSelect<GetResponseAllUsersByDivisionsDto> =
      {
        id: true,
        lastname: true,
        name: true,
        patronimyc: true,
        role: { id: true, roleName: true },
      };

    const divisionIds = await this.getDivisionOfUser(userData.id);

    return await this.repo.find({
      select,
      where: {
        division: {
          id: In(divisionIds),
          warehouse: {
            id: warehouseId,
          },
        },
      },
      order: { lastname: { direction: 'ASC' } },
      relations: { role: true },
    });
  }

  async getCardUser(staffId: number): Promise<GetResponseStaffDetailedDto[]> {
    const select: RequiredFindOptionsSelect<GetResponseStaffDetailedService> = {
      id: true,
      lastname: true,
      name: true,
      patronimyc: true,
      acceptedCartridge: {
        id: true,
        division: { name: true },
        kabinet: { number: true },
        action: { id: true, cartridge: { id: true, model: { name: true } } },
        createdAt: true,
      },
    };

    const result = await this.repo.find({
      select,
      where: { id: staffId },
      relations: {
        acceptedCartridge: {
          action: { cartridge: { model: true } },
          division: true,
          kabinet: true,
        },
      },
    });

    if (!result) {
      return [];
    }

    return this.mapper.mapArray(
      result,
      GetResponseStaffDetailedService,
      GetResponseStaffDetailedDto,
    );
  }
}
