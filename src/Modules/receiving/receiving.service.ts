import { Injectable } from '@nestjs/common';
import { Receiving } from './entities/Receiving';
import { DataSource } from 'typeorm';
import { CartridgeService } from 'src/Modules/cartridge/cartridge.service';
import { RequestCreateReceivingDto } from 'src/Modules/receiving/dto/RequestCreateReceivingDto';
import { CreateReceivingDto } from 'src/Modules/receiving/dto/CreateReceivingDto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { ServiceCreateCartridgeDto } from 'src/Modules/cartridge/dto/ServiceCreateCartridgeDto';
import { CartridgeReceiving } from 'src/Modules/receiving/entities/CartridgeReceiving';
import { CreateCartridgeReceivingDto } from 'src/Modules/receiving/dto/CreateCartridgeReceivingDto';

@Injectable()
export class ReceivingService {
  constructor(
    @InjectMapper()
    private readonly mapper: Mapper,
    private readonly cartridgeService: CartridgeService,
    private readonly dataSourse: DataSource,
  ) {}

  async create(createDto: RequestCreateReceivingDto) {
    //Маппинг dto для правильной передачи параметров для создания сущности
    const receivingDto = this.mapper.map(
      createDto,
      RequestCreateReceivingDto,
      CreateReceivingDto,
    );

    const cartridgeDto = this.mapper.map(
      createDto,
      RequestCreateReceivingDto,
      ServiceCreateCartridgeDto,
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
        cartridgeDto,
        queryRunner,
      );

      const cartridgeReceivingDtos: CreateCartridgeReceivingDto[] =
        cartridgeIds.map((cartridge) => ({
          cartridge,
          receiving,
        }));

      await cartridgeReceivingRepo.insert(cartridgeReceivingDtos);
      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
