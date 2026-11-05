import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Kabinet } from "@Modules/kabinet/entities/Kabinet";
import { SuccessResponseDto } from "@common/dto/SuccessResponseDto";
import { GetResponseKabinetsDto } from "@Modules/kabinet/dto/GetResponseKabinetsDto";
import { PostCreateKabinetDto } from "@Modules/kabinet/dto/PostCreateKabinetDto";
import { RequiredFindOptionsSelect } from "@common/types/typesUtils";
import { UserData } from "@common/decorators/types/UserType";
import { UserService } from "@Modules/user/user.service";
import { GetResponseKabinetsByUserIdDto } from "./dto/GetResponseKabinetsByUserIdDto";
import { GetKabinetsByDivisionIdsForCreateUserDto } from "./dto/GetKabinetsByDivisionIdsForCreateUserDto";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { CreateKabinetEventType } from "@Modules/events/types/CreateKabinetEventType";
import { AccessControlService } from "@Modules/access-control/access-control.service";

@Injectable()
export class KabinetService {
  constructor(
    @InjectRepository(Kabinet)
    private readonly repo: Repository<Kabinet>,
    private readonly usersService: UserService,
    private readonly accessControlService: AccessControlService,
    private eventEmitter: EventEmitter2,
  ) {}

  emitCreateKabinetEvent(data: CreateKabinetEventType) {
    this.eventEmitter.emit("delivery.cartridge", data);
  }

  async create(dto: PostCreateKabinetDto): Promise<SuccessResponseDto> {
    await this.repo.insert(dto);

    const division: CreateKabinetEventType = {
      division: dto.division,
    };

    this.emitCreateKabinetEvent(division);

    return {
      statusCode: HttpStatus.CREATED,
      message: "Кабинет успешно добавлен",
    };
  }

  async getKabinetsByDivisionId(
    divisionId: number,
    userData: UserData,
  ): Promise<GetResponseKabinetsDto[]> {
    await this.accessControlService.assertDivisionAccess(userData, divisionId);

    const select: RequiredFindOptionsSelect<GetResponseKabinetsDto> = {
      id: true,
      division: {
        name: true,
      },
      number: true,
      createdAt: true,
    };

    return await this.repo.find({
      where: {
        division: {
          id: divisionId,
        },
      },
      select,
      relations: {
        division: true,
      },
    });
  }

  async getKabinetsByUserId(
    userid: number,
  ): Promise<GetResponseKabinetsByUserIdDto[]> {
    const select: RequiredFindOptionsSelect<GetResponseKabinetsByUserIdDto> = {
      id: true,
      number: true,
    };

    return await this.repo.find({
      where: { users: { id: userid } },
      select,
    });
  }

  async getKabinetsByDivisionIdForCreateUser(
    divisionIds: number[],
    userData: UserData,
  ): Promise<GetKabinetsByDivisionIdsForCreateUserDto[]> {
    const uniqueDivisionIds = [...new Set(divisionIds)];

    await Promise.all(
      uniqueDivisionIds.map((divisionId) =>
        this.accessControlService.assertDivisionAccess(userData, divisionId),
      ),
    );

    const select: RequiredFindOptionsSelect<GetKabinetsByDivisionIdsForCreateUserDto> =
      {
        id: true,
        division: {
          id: true,
          name: true,
        },
        number: true,
      };

    return await this.repo.find({
      where: {
        division: {
          id: In(uniqueDivisionIds),
        },
      },
      select,
      relations: {
        division: true,
      },
    });
  }
}
