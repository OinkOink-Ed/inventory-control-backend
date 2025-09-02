import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { SuccessResponseDto } from '@common/dto/SuccessResponseDto';
import { CartridgeService } from '@Modules/cartridge/cartridge.service';
import { ServiceDecommissioningCartridge } from '@Modules/cartridge/ClassesForMapping/ServiceDecommissioningCartridge';
import { PostCreateDecommissioningDto } from '@Modules/decommissioning/dto/PostCreateDecommissioningDto';
import { CartridgeDecommissioning } from '@Modules/decommissioning/entities/CartridgeDecommissioning';
import { Decommissioning } from '@Modules/decommissioning/entities/Decommissioning';
import { ServiceCreateCartridgeDecommissioning } from '@Modules/decommissioning/interfaces/ServiceCreateCartridgeMovement';
import { ServiceCreateDecommissioning } from '@Modules/decommissioning/ClassesForMapped/ServiceCreateDecommissioning';
import { HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AccessControlService } from '@Modules/access-control/access-control.service';

@Injectable()
export class DecommissioningService {
  constructor(
    @InjectMapper()
    private readonly mapper: Mapper,
    private readonly cartridgeService: CartridgeService,
    private readonly dataSourse: DataSource,
    private readonly accessControlService: AccessControlService,
  ) {}

  async create(
    createDto: PostCreateDecommissioningDto,
  ): Promise<SuccessResponseDto> {
    await this.accessControlService.getAccessWarehouse(
      createDto.creator.id,
      createDto.creator.id,
    );

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
          createDto: PostCreateDecommissioningDto,
          comment: createDto.comment,
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
