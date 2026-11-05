import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Division } from "@Modules/division/entities/Division";
import { SuccessResponseDto } from "@common/dto/SuccessResponseDto";
import { PostCreateDivisionDto } from "@Modules/division/dto/PostCreateDivisionDto";
import { GetReponseAllDivisionDto } from "@Modules/division/dto/GetReponseAllDivisionDto";
import { RequiredFindOptionsSelect } from "@common/types/typesUtils";
import { UserService } from "@Modules/user/user.service";
import { UserData } from "@common/decorators/types/UserType";
import { GetResponseDivisionByWarehouseIdDto } from "./dto/GetResponseDivisionByWarehouseIdDto";
import { AccessControlService } from "@Modules/access-control/access-control.service";

@Injectable()
export class DivisionService {
  constructor(
    @InjectRepository(Division)
    private readonly repo: Repository<Division>,
    private readonly usersService: UserService,
    private readonly accessControlService: AccessControlService,
  ) {}

  async create(dto: PostCreateDivisionDto): Promise<SuccessResponseDto> {
    await this.repo.insert(dto);
    return {
      statusCode: HttpStatus.CREATED,
      message: "Подразделение успешно добавлено",
    };
  }

  async getDivisions(userData: UserData): Promise<GetReponseAllDivisionDto[]> {
    const select: RequiredFindOptionsSelect<GetReponseAllDivisionDto> = {
      id: true,
      name: true,
      location: true,
    };

    if (
      userData.role.roleName !== "user" &&
      userData.role.roleName !== "staff"
    ) {
      return await this.repo.find({
        select,
      });
    }

    const divisionIds = await this.usersService.getDivisionOfUser(userData.id);

    return await this.repo.find({
      select,
      where: {
        id: In(divisionIds),
      },
    });
  }

  async getDivision(
    warehouseId: number,
    userData: UserData,
  ): Promise<GetResponseDivisionByWarehouseIdDto | null> {
    await this.accessControlService.assertWarehouseAccess(
      userData,
      warehouseId,
    );

    const select: RequiredFindOptionsSelect<GetResponseDivisionByWarehouseIdDto> =
      {
        id: true,
        name: true,
      };

    return await this.repo.findOne({
      select,
      where: {
        warehouse: {
          id: warehouseId,
        },
      },
    });
  }
}
