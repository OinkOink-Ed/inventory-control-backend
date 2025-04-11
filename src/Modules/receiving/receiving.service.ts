import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Receiving } from './entities/Receiving';
import { Repository } from 'typeorm';
import { Cartridge } from '../cartridge/entities/Cartridge';

@Injectable()
export class ReceivingService {
  constructor(
    @InjectRepository(Receiving)
    @InjectRepository(Cartridge)
    private readonly receivingRepo: Repository<Receiving>,
    private readonly cartridgeRepo: Repository<Cartridge>,
  ) {}

  async create(dto: any) {}
}
