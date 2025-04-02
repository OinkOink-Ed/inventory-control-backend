import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartridgeModel } from 'src/common/entities/CartridgeModel';
import { Repository } from 'typeorm';
import { CreateCartridgeModelDto } from './dto/CreateCartridgeModelDto';
import {
  ReadCartridgeModelDto,
  ReadCartridgeModelDtoDetailed,
} from './dto/ReadCartridgeModelDto';

@Injectable()
export class CartridgeModelService {
  constructor(
    @InjectRepository(CartridgeModel)
    private readonly repo: Repository<CartridgeModel>,
  ) {}

  async create(dto: CreateCartridgeModelDto) {
    return await this.repo.save(dto);
  }

  async getAll(): Promise<ReadCartridgeModelDto[]> {
    return await this.repo.find();
  }

  //После добавления отношения нужно будет скорректировать
  async getAllDetailed(): Promise<ReadCartridgeModelDtoDetailed[]> {
    return await this.repo
      .find

      // {
      //   select: {
      //     creatorId: {
      //       id: true,
      //       surname: true,
      //       name: true,
      //       patronimyc: true,
      //     },
      //   },
      //   relations: ['creator'],
      // }
      ();
  }
}
