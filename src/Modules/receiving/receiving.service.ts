import { HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { CartridgeService } from '@Modules/cartridge/cartridge.service';
import { SuccessResponseDto } from '@common/dto/SuccessResponseDto';
import { PostCreateReceivingDto } from '@Modules/receiving/dto/PostCreateReceivingDto';
import { ServiceCreateReceiving } from '@Modules/receiving/service/ServiceCreateReceiving';
import { Receiving } from '@Modules/receiving/entities/Receiving';
import { CartridgeReceiving } from '@Modules/receiving/entities/CartridgeReceiving';
import { ServiceCreateCartridgeReceiving } from '@Modules/receiving/interfaces/ServiceCreateCartridgeReceiving';

@Injectable()
export class ReceivingService {
  constructor(
    @InjectMapper()
    private readonly mapper: Mapper,
    private readonly cartridgeService: CartridgeService,
    private readonly dataSourse: DataSource,
  ) {}
  async create(createDto: PostCreateReceivingDto): Promise<SuccessResponseDto> {
    //Маппинг dto для правильной передачи параметров для создания сущности
    const receivingDto = this.mapper.map(
      createDto,
      PostCreateReceivingDto,
      ServiceCreateReceiving,
    );

    const queryRunner = this.dataSourse.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Это гарантирует, что репозитории точно будут относиться к данной транзакции
      const receivingRepo = queryRunner.manager.getRepository(Receiving);
      const cartridgeReceivingRepo =
        queryRunner.manager.getRepository(CartridgeReceiving);

      const receivingResult = await receivingRepo.insert(receivingDto);

      // Получаем id созданной сущности
      const receiving = receivingResult.identifiers[0].id;

      //Лучше передать транзакцию нежели создавать новую
      const cartridgeIds = await this.cartridgeService.createMany(
        createDto,
        queryRunner,
      );

      const cartridgeReceivingDtos: ServiceCreateCartridgeReceiving[] =
        cartridgeIds.map((cartridge) => ({
          cartridge,
          receiving: receiving,
        }));

      await cartridgeReceivingRepo.insert(cartridgeReceivingDtos);
      await queryRunner.commitTransaction();
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Картриджи успешно приняты',
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
