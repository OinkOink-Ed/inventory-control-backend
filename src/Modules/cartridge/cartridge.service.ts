import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cartridge } from 'src/common/entities/Cartridge';
import { CreateCartridgeDto } from 'src/Modules/cartridge/dto/CreateCartridgeDto';
import { Repository } from 'typeorm';

@Injectable()
export class CartridgesService {
  constructor(
    @InjectRepository(Cartridge)
    private readonly repoCartridges: Repository<Cartridge>,
    // @InjectRepository(Movement)
    // private readonly repoMovements: Repository<Movement>,
  ) {}

  async create(dto: CreateCartridgeDto) {
    return await this.repoCartridges.insert(dto);
  }
}
