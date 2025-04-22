import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { HttpStatus, Injectable } from '@nestjs/common';
import { SuccessResponse } from 'src/common/dto/SuccessResponseDto';
import { PostCreateMovementDto } from './dto/PostCreateMovementDto';
import { ServiceCreateMovement } from './service/ServiceCreateMovement';
import { DataSource } from 'typeorm';
import { Movement } from './entities/Movement';
import { CartridgeMovement } from './entities/CartridgeMovement';
import { CartridgeService } from '../cartridge/cartridge.service';
import { ServiceMoveCartridge } from '../cartridge/service/ServiceMoveCartridge';
import { ServiceCreateCartridgeMovement } from './interfaces/ServiceCreateCartridgeMovement';

@Injectable()
export class MovementService {
  constructor(
    @InjectMapper()
    private readonly mapper: Mapper,
    private readonly cartridgeService: CartridgeService,
    private readonly dataSourse: DataSource,
  ) {}
  async create(createDto: PostCreateMovementDto): Promise<SuccessResponse> {
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

    const queryRunner = this.dataSourse.createQueryRunner();

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

      return {
        message: 'Картриджи успешно пермещены',
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
