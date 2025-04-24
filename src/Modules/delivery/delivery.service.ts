import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { CartridgeService } from '@Modules/cartridge/cartridge.service';
import { ServiceDeliveryCartridge } from '@Modules/cartridge/service/ServiceDeliveryCartridge';
import { PostCreateDeliveryDto } from '@Modules/delivery/dto/PostCreateDeliveryDto';
import { CartridgeDelivery } from '@Modules/delivery/entities/CartridgeDelivery';
import { Delivery } from '@Modules/delivery/entities/Delivery';
import { ServiceCreateCartridgeDelivery } from '@Modules/delivery/interfaces/ServiceCreateCartridgeDelivery';
import { ServiceCreateDelivery } from '@Modules/delivery/service/ServiceCreateDelivery';
import { HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

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
