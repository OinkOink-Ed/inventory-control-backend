import { HttpStatus, Injectable } from '@nestjs/common';
import { Receiving } from './entities/Receiving';
import { DataSource } from 'typeorm';
import { CartridgeService } from 'src/Modules/cartridge/cartridge.service';
import { PostCreateReceivingDto } from 'src/Modules/receiving/dto/PostCreateReceivingDto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { CartridgeReceiving } from 'src/Modules/receiving/entities/CartridgeReceiving';
import { ServiceCreateCartridgeReceiving } from 'src/Modules/receiving/interfaces/ServiceCreateCartridgeReceiving';
import { SuccessResponseDto } from 'src/common/dto/SuccessResponseDto';
import { ServiceCreateReceiving } from 'src/Modules/receiving/service/ServiceCreateReceiving';
import { ServiceCreateCartridge } from '../cartridge/service/ServiceCreateCartridge';

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

    const cartridgeDto = this.mapper.map(
      createDto,
      PostCreateReceivingDto,
      ServiceCreateCartridge,
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
