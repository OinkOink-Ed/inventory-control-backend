import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CartridgeService } from '../cartridge/cartridge.service';
import { DataSource } from 'typeorm';
import { PostCreateDecommissioningDto } from './dto/PostCreateDecommissioningDto';
import { SuccessResponseDto } from 'src/common/dto/SuccessResponseDto';
import { ServiceCreateDecommissioning } from './service/ServiceCreateDecommissioning';
import { Decommissioning } from './entities/Decommissioning';
import { CartridgeDecommissioning } from './entities/CartridgeDecommissioning';
import { ServiceDecommissioningCartridge } from '../cartridge/service/ServiceDecommissioningCartridge';
import { ServiceCreateCartridgeDecommissioning } from './interfaces/ServiceCreateCartridgeMovement';

@Injectable()
export class DecommissioningService {
  constructor(
    @InjectMapper()
    private readonly mapper: Mapper,
    private readonly cartridgeService: CartridgeService,
    private readonly dataSourse: DataSource,
  ) {}

  async create(
    createDto: PostCreateDecommissioningDto,
  ): Promise<SuccessResponseDto> {
    //Маппинг dto для правильной передачи параметров для создания сущности
    const decommissioningDto = this.mapper.map(
      createDto,
      PostCreateDecommissioningDto,
      ServiceCreateDecommissioning,
    );

    const cartridgeDto = this.mapper.map(
      createDto,
      PostCreateDecommissioningDto,
      ServiceDecommissioningCartridge,
    );

    const queryRunner = this.dataSourse.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Это гарантирует, что репозитории точно будут относиться к данной транзакции
      const decommissioningRepo =
        queryRunner.manager.getRepository(Decommissioning);
      const cartridgeDecommissioningRepo = queryRunner.manager.getRepository(
        CartridgeDecommissioning,
      );

      const decommissioningResult =
        await decommissioningRepo.insert(decommissioningDto);

      // Получаем id созданной сущности
      const decommissioning = decommissioningResult.identifiers[0].id;

      const cartridgeIds = await this.cartridgeService.decommissioningMany(
        cartridgeDto,
        queryRunner,
      );

      const cartridgeDecommissioningDtos: ServiceCreateCartridgeDecommissioning[] =
        cartridgeIds.map((cartridge) => ({
          cartridge: { id: cartridge },
          decommissioning: decommissioning,
        }));

      await cartridgeDecommissioningRepo.insert(cartridgeDecommissioningDtos);
      await queryRunner.commitTransaction();

      return {
        message: 'Картриджи успешно списаны',
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
