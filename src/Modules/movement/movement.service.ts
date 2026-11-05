import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { SuccessResponseDto } from "@common/dto/SuccessResponseDto";
import { CartridgeService } from "@Modules/cartridge/cartridge.service";
import { ServiceMoveCartridge } from "@Modules/cartridge/ClassesForMapping/ServiceMoveCartridge";
import { PostCreateMovementDto } from "@Modules/movement/dto/PostCreateMovementDto";
import { CartridgeMovement } from "@Modules/movement/entities/CartridgeMovement";
import { Movement } from "@Modules/movement/entities/Movement";
import { ServiceCreateCartridgeMovement } from "@Modules/movement/interfaces/ServiceCreateCartridgeMovement";
import { ServiceCreateMovement } from "@Modules/movement/ClassesForMapped/ServiceCreateMovement";
import { BadRequestException, HttpStatus, Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { MovementCartridgeEventType } from "@Modules/events/types/MovementCartridgeEventType";
import { UserData } from "@common/decorators/types/UserType";
import { AccessControlService } from "@Modules/access-control/access-control.service";

@Injectable()
export class MovementService {
  constructor(
    @InjectMapper()
    private readonly mapper: Mapper,
    private readonly cartridgeService: CartridgeService,
    private readonly dataSource: DataSource,
    private eventEmitter: EventEmitter2,
    private readonly accessControlService: AccessControlService,
  ) {}
  async create(
    createDto: PostCreateMovementDto,
    userData: UserData,
  ): Promise<SuccessResponseDto> {
    if (createDto.warehouseFrom.id === createDto.warehouseWhere.id) {
      throw new BadRequestException(
        "Исходный и целевой склады должны отличаться",
      );
    }

    await Promise.all([
      this.accessControlService.assertWarehouseAccess(
        userData,
        createDto.warehouseFrom.id,
      ),
      this.accessControlService.assertWarehouseAccess(
        userData,
        createDto.warehouseWhere.id,
      ),
    ]);

    await this.accessControlService.assertUserCanAcceptWarehouse(
      createDto.whoAccepted.id,
      createDto.warehouseWhere.id,
    );

    //Маппинг dto для правильной передачи параметров для создания сущности
    const movementDto = this.mapper.map(
      createDto,
      PostCreateMovementDto,
      ServiceCreateMovement,
    );

    const cartridgeDto = this.mapper.map(
      createDto,
      PostCreateMovementDto,
      ServiceMoveCartridge,
    );

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Это гарантирует, что репозитории точно будут относиться к данной транзакции
      const movementRepo = queryRunner.manager.getRepository(Movement);
      const cartridgeMovementRepo =
        queryRunner.manager.getRepository(CartridgeMovement);

      const movementResult = await movementRepo.insert(movementDto);

      // Получаем id созданной сущности
      const movement = movementResult.identifiers[0].id;

      const cartridgeIds = await this.cartridgeService.moveMany(
        cartridgeDto,
        queryRunner,
      );

      const cartridgeMovementDtos: ServiceCreateCartridgeMovement[] =
        cartridgeIds.map((cartridge) => ({
          cartridge: { id: cartridge },
          movement: movement,
        }));

      await cartridgeMovementRepo.insert(cartridgeMovementDtos);
      await queryRunner.commitTransaction();

      const data: MovementCartridgeEventType = {
        newDivisionId: createDto.warehouseWhere.id,
        oldDivisionId: cartridgeDto.warehouseFrom.id,
      };

      this.eventEmitter.emit("movement.cartridge", data);

      return {
        message: "Картриджи успешно пермещены",
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
