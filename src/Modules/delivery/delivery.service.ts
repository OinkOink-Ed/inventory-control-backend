import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { CartridgeService } from '@Modules/cartridge/cartridge.service';
import { ServiceDeliveryCartridge } from '@Modules/cartridge/ClassesForMapping/ServiceDeliveryCartridge';
import { PostCreateDeliveryDto } from '@Modules/delivery/dto/PostCreateDeliveryDto';
import { CartridgeDelivery } from '@Modules/delivery/entities/CartridgeDelivery';
import { Delivery } from '@Modules/delivery/entities/Delivery';
import { ServiceCreateCartridgeDelivery } from '@Modules/delivery/ClassesForMapped/ServiceCreateCartridgeDelivery';
import { ServiceCreateDelivery } from '@Modules/delivery/ClassesForMapped/ServiceCreateDelivery';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { RequiredFindOptionsSelect } from '@common/utils/typesUtils';
import { GetDeliveryByWarehouseIdService } from './ClassesForMapped/GetDeliveryByWarehouseIdService';
import { GetDeliveryByWarehouseIdDto } from './dto/GetDeliveryByWarehouseIdDto';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectMapper()
    private readonly mapper: Mapper,
    private readonly cartridgeService: CartridgeService,
    @InjectRepository(Delivery)
    private readonly repoDelivery: Repository<Delivery>,
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
  ): Promise<GetDeliveryByWarehouseIdDto[]> {
    const select: RequiredFindOptionsSelect<GetDeliveryByWarehouseIdService> = {
      id: true,
      division: { name: true },
      kabinet: { number: true },
      accepting: { lastname: true, name: true, patronimyc: true },
      creator: { lastname: true, name: true, patronimyc: true },
      warehouse: { name: true },
      action: { id: true, cartridge: { id: true, model: { name: true } } },
      createdAt: true,
    };

    const result = await this.repoDelivery.find({
      select,
      where: { warehouse: { id: warehouseId } },
      relations: {
        accepting: true,
        creator: true,
        kabinet: true,
        division: true,
        action: { cartridge: { model: true } },
      },
    });

    return this.mapper.mapArray(
      result,
      GetDeliveryByWarehouseIdService,
      GetDeliveryByWarehouseIdDto,
    );
  }
}
