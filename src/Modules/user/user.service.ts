import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { User } from "@Modules/user/entities/User";
import { PostCreateUserDto } from "@Modules/user/dto/PostCreateUserDto";
import { SuccessResponseDto } from "@common/dto/SuccessResponseDto";
import { ServiceForAuthFindUser } from "@Modules/user/service/ServiceForAuthFindUser";
import { GetResponseAllUserDto } from "@Modules/user/dto/GetResponseAllUserDto";
import { RequiredFindOptionsSelect } from "@common/utils/typesUtils";
import { ServiceForFindUser } from "./service/ServiceFindUser";
import { ServiceFindUserForChoiseWarehouse } from "./service/ServiceFindUserForChoiseWarehouse";
import { GetResponseAllUsersByDivisionsDto } from "@Modules/user/dto/GetResponseAllUsersByDivisionsDto";
import { GetResponseUserCardDto } from "@Modules/user/dto/GetResponseUserCardDto";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { UserData } from "@common/decorators/types/UserType";
import { RoleService } from "@Modules/role/role.service";
import { PatchEditUserDto } from "./dto/PatchEditUserDto";
import { PatchEditProfileDto } from "./dto/PatchEditProfileDto";
import { Role } from "@Modules/role/entities/Role";
import { Division } from "@Modules/division/entities/Division";
import { Kabinet } from "@Modules/kabinet/entities/Kabinet";
import { GetResponseAcceptedCartridgeByUserService } from "./ClassesForMapped/GetResponseAcceptedCartridgeByUserService";
import { GetResponseAcceptedCartridgeByUserDto } from "./dto/GetResponseAcceptedCartridgeByUserDto";
import { GetResponseUserCardService } from "./ClassesForMapped/GetResponseUserCardService";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { UpdateUserEventType } from "@Modules/events/types/UpdateUserEventType";
import { GetProfileDto } from "./dto/GetProfileDto";

@Injectable()
export class UserService {
  constructor(
    @InjectMapper()
    private readonly mapper: Mapper,
    @InjectRepository(User)
    private readonly repo: Repository<User>,
    private readonly roleService: RoleService,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Division)
    private readonly divisionRepository: Repository<Division>,
    @InjectRepository(Kabinet)
    private readonly kabinetRepository: Repository<Kabinet>,
    private eventEmitter: EventEmitter2,
  ) {}

  async getDivisionOfUser(userId: number): Promise<number[]> {
    const user = await this.findOneById(userId);

    if (!user)
      throw new BadRequestException("Такого пользователя не существует");

    const divisionIds = user?.division.map((item) => item.id);

    if (!divisionIds)
      throw new BadRequestException("У пользователя нет подразделений");

    return divisionIds;
  }

  async createUser(
    dto: PostCreateUserDto,
    userData: UserData,
  ): Promise<SuccessResponseDto> {
    if (userData.role.roleName == "user") {
      const role = await this.roleService.getRole(dto.role.id);
      if (role?.roleName === "admin") {
        throw new ForbiddenException(
          "Вы не можете создать пользователя с этой ролью",
        );
      }
    }

    const salt = await bcrypt.genSalt(10);

    dto.password = await bcrypt.hash(dto.password, salt);

    await this.repo.insert(dto);
    return {
      statusCode: HttpStatus.CREATED,
      message: "Пользователь успешно добавлен",
    };
  }

  async editUser(userId: number, dto: PatchEditUserDto, userData: UserData) {
    this.validateUserEditPermissions(dto, userData);

    const user = await this.repo.findOne({
      where: { id: userId },
      relations: {
        role: true,
        division: true,
        kabinets: true,
      },
    });

    if (!user) {
      throw new NotFoundException("Пользователь не найден");
    }

    if (dto.username !== undefined) {
      user.username = dto.username;
    }

    if (dto.name !== undefined) {
      user.name = dto.name;
    }

    if (dto.lastname !== undefined) {
      user.lastname = dto.lastname;
    }

    if (dto.patronimyc !== undefined) {
      user.patronimyc = dto.patronimyc;
    }

    if (dto.telephone !== undefined) {
      user.telephone = dto.telephone;
    }

    if (dto.role !== undefined) {
      user.role = await this.findRoleOrFail(dto.role.id);
    }

    if (dto.division !== undefined) {
      user.division = await this.findDivisionsOrFail(
        dto.division.map((division) => division.id),
      );
    }

    if (dto.kabinets !== undefined) {
      user.kabinets = await this.findKabinetsOrFail(
        dto.kabinets.map((kabinet) => kabinet.id),
      );
    }

    await this.repo.save(user);

    const eventData: UpdateUserEventType = {
      userId: user.id,
      division: user.division,
    };

    this.eventEmitter.emit("update.user", eventData);

    return {
      statusCode: HttpStatus.OK,
      message: "Пользователь успешно обновлен",
    };
  }

  async editProfile(dto: PatchEditProfileDto, userData: UserData) {
    const user = await this.repo.findOne({
      where: { id: userData.id },
    });

    if (!user) {
      throw new NotFoundException("Пользователь не найден");
    }

    if (dto.username !== undefined) {
      user.username = dto.username;
    }

    if (dto.name !== undefined) {
      user.name = dto.name;
    }

    if (dto.lastname !== undefined) {
      user.lastname = dto.lastname;
    }

    if (dto.patronimyc !== undefined) {
      user.patronimyc = dto.patronimyc;
    }

    if (dto.telephone !== undefined) {
      user.telephone = dto.telephone;
    }

    await this.repo.save(user);

    this.eventEmitter.emit("update.user", {
      userId: user.id,
    });

    return {
      statusCode: HttpStatus.OK,
      message: "Пользователь успешно обновлен",
    };
  }

  async findOneForAuth(
    username: string,
  ): Promise<ServiceForAuthFindUser | null> {
    const select: RequiredFindOptionsSelect<ServiceForAuthFindUser> = {
      id: true,
      password: true,
      role: { roleName: true },
      lastname: true,
      name: true,
      patronimyc: true,
    };

    return await this.repo.findOne({
      where: {
        username: `${username}`,
      },
      select,
      relations: ["role"],
    });
  }

  async findOneGetProfile(id: number): Promise<GetProfileDto | null> {
    const select: RequiredFindOptionsSelect<GetProfileDto> = {
      id: true,
      role: { roleName: true },
      lastname: true,
      name: true,
      patronimyc: true,
    };

    return await this.repo.findOne({
      where: {
        id: id,
      },
      select,
      relations: ["role"],
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
      relations: ["role"],
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

  async findUserForEditAccess(userId: number) {
    return await this.repo.findOne({
      where: { id: userId },
      select: {
        id: true,
        role: {
          roleName: true,
        },
        division: {
          id: true,
        },
      },
      relations: {
        role: true,
        division: true,
      },
    });
  }

  async getAll(userData: UserData): Promise<GetResponseAllUserDto[]> {
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

    const divisionIds = await this.getDivisionOfUser(userData.id);

    const usersWithFilteredDivisions = await this.repo.find({
      where: {
        division: {
          id: In(divisionIds),
        },
      },
      select: ["id"],
    });

    const userIds = usersWithFilteredDivisions.map((user) => user.id);

    return await this.repo.find({
      select,
      where: {
        id: In(userIds),
      },
      order: { lastname: { direction: "ASC" } },
      relations: ["role", "division"],
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
      order: { lastname: { direction: "ASC" } },
      relations: { role: true },
    });
  }

  async getCardUserAcceptedCartridge(
    staffId: number,
  ): Promise<GetResponseAcceptedCartridgeByUserDto[]> {
    const select: RequiredFindOptionsSelect<GetResponseAcceptedCartridgeByUserService> =
      {
        id: true,
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
      GetResponseAcceptedCartridgeByUserService,
      GetResponseAcceptedCartridgeByUserDto,
    );
  }

  async getCardProfileAcceptedCartridge(
    userData: UserData,
  ): Promise<GetResponseAcceptedCartridgeByUserDto[]> {
    const select: RequiredFindOptionsSelect<GetResponseAcceptedCartridgeByUserService> =
      {
        id: true,
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
      where: { id: userData.id },
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
      GetResponseAcceptedCartridgeByUserService,
      GetResponseAcceptedCartridgeByUserDto,
    );
  }

  async getProfileCard(
    userData: UserData,
  ): Promise<GetResponseUserCardDto | null> {
    const select: RequiredFindOptionsSelect<GetResponseUserCardService> = {
      id: true,
      lastname: true,
      name: true,
      patronimyc: true,
      telephone: true,
      username: true,
      role: { id: true, roleName: true },
      division: { id: true, name: true },
      kabinets: { id: true, number: true },
      state: true,
    };

    const result = await this.repo.findOne({
      select,
      where: { id: userData.id },
      relations: {
        role: true,
        division: true,
        kabinets: true,
      },
    });

    if (!result) return null;

    return result;
  }

  async getCardUser(staffId: number): Promise<GetResponseUserCardDto | null> {
    const select: RequiredFindOptionsSelect<GetResponseUserCardService> = {
      id: true,
      lastname: true,
      name: true,
      patronimyc: true,
      telephone: true,
      username: true,
      role: { id: true, roleName: true },
      division: { id: true, name: true },
      kabinets: { id: true, number: true },
      state: true,
    };

    const result = await this.repo.findOne({
      select,
      where: { id: staffId },
      relations: {
        role: true,
        division: true,
        kabinets: true,
      },
    });

    if (!result) return null;

    return result;
  }

  private validateUserEditPermissions(
    dto: PatchEditUserDto,
    userData: UserData,
  ): void {
    if (userData.role.roleName !== "user") {
      return;
    }

    const allowedFields = new Set<keyof PatchEditUserDto>([
      "username",
      "name",
      "lastname",
      "patronimyc",
      "telephone",
      "kabinets",
    ]);

    const hasForbiddenFields = (
      Object.keys(dto) as (keyof PatchEditUserDto)[]
    ).some((field) => !allowedFields.has(field));

    if (hasForbiddenFields) {
      throw new ForbiddenException(
        "Недостаточно прав для изменения этих данных пользователя",
      );
    }
  }

  private async findRoleOrFail(roleId: number): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { id: roleId },
    });

    if (!role) {
      throw new NotFoundException(`Роль с ID ${roleId} не найдена`);
    }

    return role;
  }

  private async findDivisionsOrFail(
    divisionIds: number[],
  ): Promise<Division[]> {
    const uniqueIds = [...new Set(divisionIds)];

    const divisions = await this.divisionRepository.find({
      where: {
        id: In(uniqueIds),
      },
    });

    if (divisions.length !== uniqueIds.length) {
      throw new NotFoundException(
        "Одно или несколько подразделений не найдены",
      );
    }

    return divisions;
  }

  private async findKabinetsOrFail(kabinetIds: number[]): Promise<Kabinet[]> {
    const uniqueIds = [...new Set(kabinetIds)];

    const kabinets = await this.kabinetRepository.find({
      where: {
        id: In(uniqueIds),
      },
    });

    if (kabinets.length !== uniqueIds.length) {
      throw new NotFoundException("Один или несколько кабинетов не найдены");
    }

    return kabinets;
  }
}
