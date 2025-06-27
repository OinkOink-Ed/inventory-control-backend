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
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { GetDeliveryByWarehouseIdDto } from './dto/GetDeliveryByWarehouseIdDto';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectMapper()
    private readonly mapper: Mapper,
    private readonly cartridgeService: CartridgeService,
    @InjectRepository(Delivery)
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
        cartridgeIds.map((cartridge) => {
          return {
            cartridge: { id: cartridge },
            delivery: delivery,
          };
        });

      await cartridgeDeliveryRepo.save(cartridgeDeliveryDtos);
      await queryRunner.commitTransaction();

      return {
        message: 'Картриджи успешно выданы',
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.log(error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getDetailedByWarehouseId(
    warehouseId: number,
  ): Promise<GetDeliveryByWarehouseIdDto[] | void> {
    const queryRunner = this.dataSourse.createQueryRunner();

    try {
      // Подключаемся к базе данных
      await queryRunner.connect();

      // Выполняем нативный SQL-запрос
      const deliverys = await queryRunner.query(
        `
        SELECT delivery.id 'id', 
warehouse.name 'warehouse',
division.name 'division',
kabinet.number 'kabinet',
user.lastname 'lastname', user.name 'name', user.patronimyc 'patronimyc',
staff.lastname 'lastnameAccepted', staff.name 'nameAccepted', staff.patronimyc 'patronimycAccepted',
cartridge_model.name 'model.name',
COUNT(delivery.id) as count_cartridge, delivery.createdAt 'delivery.createdAt' FROM delivery
JOIN cartridge_delivery ON cartridge_delivery.deliveryId  = delivery.id
JOIN warehouse ON warehouse.id = delivery.warehouseId
JOIN division ON division.id = delivery.divisionId
JOIN kabinet ON kabinet.id = delivery.kabinetId
JOIN user ON user.id = delivery.creatorId
LEFT JOIN staff ON staff.id = delivery.acceptingId
JOIN cartridge ON cartridge.id = cartridge_delivery.cartridgeId
JOIN cartridge_model ON cartridge_model.id = cartridge.modelId
GROUP BY delivery.id, cartridge_model.name
        `,
        [warehouseId],
      );

      // const plainDeliverys = deliverys.map((delivery) =>
      //   instanceToPlain(delivery, { exposeUnsetFields: false }),
      // );

      // return plainToInstance(GetDeliveryByWarehouseIdDto, plainDeliverys, {
      //   excludeExtraneousValues: true,
      // });
      return deliverys;
    } catch (error) {
      console.log(error);
    } finally {
      await queryRunner.release();
    }
  }
}
