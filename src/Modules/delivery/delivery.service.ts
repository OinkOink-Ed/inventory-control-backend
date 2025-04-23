import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CartridgeService } from 'src/Modules/cartridge/cartridge.service';
import { PostCreateDeliveryDto } from 'src/Modules/delivery/dto/PostCreateDeliveryDto';
import { DataSource } from 'typeorm';
import { ServiceCreateDelivery } from './service/ServiceCreateDelivery';
import { ServiceDeliveryCartridge } from '../cartridge/service/ServiceDeliveryCartridge';
import { Delivery } from './entities/Delivery';
import { CartridgeDelivery } from './entities/CartridgeDelivery';
import { ServiceCreateCartridgeDelivery } from './interfaces/ServiceCreateCartridgeDelivery';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectMapper()
    private readonly mapper: Mapper,
    private readonly cartridgeService: CartridgeService,
    private readonly dataSourse: DataSource,
  ) {}

  async create(createDto: PostCreateDeliveryDto) {
    const deliveryDto = this.mapper.map(
      createDto,
      PostCreateDeliveryDto,
      ServiceCreateDelivery,
    );

    const cartridgeDto = this.mapper.map(
      createDto,
      PostCreateDeliveryDto,
      ServiceDeliveryCartridge,
    );

    const queryRunner = this.dataSourse.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const deliveryRepo = queryRunner.manager.getRepository(Delivery);
      const cartridgeDeliveryRepo =
        queryRunner.manager.getRepository(CartridgeDelivery);

      const deliveryResult = await deliveryRepo.insert(deliveryDto);

      const delivery = deliveryResult.identifiers[0].id;

      const cartridgeIds = await this.cartridgeService.deliveryMany(
        cartridgeDto,
        queryRunner,
      );

      const cartridgeDeliveryDtos: ServiceCreateCartridgeDelivery[] =
        cartridgeIds.map((cartridge) => ({
          cartridge: { id: cartridge },
          delivery: delivery,
        }));

      await cartridgeDeliveryRepo.insert(cartridgeDeliveryDtos);
      await queryRunner.commitTransaction();

      return {
        message: 'Картриджи успешно выданы',
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
