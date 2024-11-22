import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cartridge } from 'src/common/entities/cartridge';
import { Repository } from 'typeorm';
import { CreateCartridgeDto } from './dto/CreateCartridgeDto';

@Injectable()
export class CartridgesService {
    constructor(
        @InjectRepository(Cartridge)
        private readonly repo: Repository<Cartridge>,
    ) { }

    async create(dto: CreateCartridgeDto) {
        await this.repo.insert(dto);
    };
};
