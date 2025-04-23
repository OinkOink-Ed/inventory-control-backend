import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CartridgeService } from 'src/Modules/cartridge/cartridge.service';
import { PostCreateDeliveryDto } from 'src/Modules/delivery/dto/PostCreateDeliveryDto';
import { DataSource } from 'typeorm';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectMapper()
    private readonly mapper: Mapper,
    private readonly cartridgeService: CartridgeService,
    private readonly dataSourse: DataSource,
  ) {}

  async create(dto: PostCreateDeliveryDto) {
    return {
      message: 'Картриджи успешно выданы',
      statusCode: HttpStatus.CREATED,
    };
  }
}
