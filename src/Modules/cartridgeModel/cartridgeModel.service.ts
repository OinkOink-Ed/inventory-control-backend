import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestCreateCartridgeModelDto } from 'src/Modules/cartridgeModel/dto/RequestCreateCartridgeModelDto';
import { ResponseGetAllCartridgeModelDto } from 'src/Modules/cartridgeModel/dto/ResponseGetAllCartridgeModelDto';
import { ResponseGetAllDetailedCartridgeModelDto } from 'src/Modules/cartridgeModel/dto/ResponseGetAllDetailedCartridgeModelDto';
import { CartridgeModel } from 'src/Modules/cartridgeModel/entities/CartridgeModel';
import { Repository } from 'typeorm';

@Injectable()
export class CartridgeModelService {
  constructor(
    @InjectRepository(CartridgeModel)
    private readonly repoCartridgeModel: Repository<CartridgeModel>,
  ) {}

  async create(dto: RequestCreateCartridgeModelDto) {
    return await this.repoCartridgeModel.save(dto);
  }

  async getAll(): Promise<ResponseGetAllCartridgeModelDto[]> {
    return await this.repoCartridgeModel.find({
      select: {
        id: true,
        name: true,
      },
    });
  }

  //После добавления отношения нужно будет скорректировать
  async getAllDetailed(): Promise<ResponseGetAllDetailedCartridgeModelDto[]> {
    return await this.repoCartridgeModel.find({
      select: {
        id: true,
        name: true,
        creator: {
          id: true,
          lastname: true,
          name: true,
          patronimyc: true,
        },
      },
      relations: ['Сartridge'],
    });
  }
}
