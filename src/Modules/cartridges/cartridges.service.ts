import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cartridges } from 'src/common/entities/cartridges';
import { Repository } from 'typeorm';
import { CreateCartridgeDto } from './dto/CreateCartridgeDto';

@Injectable()
export class CartridgesService {
    constructor(
        @InjectRepository(Cartridges)
        private readonly repo: Repository<Cartridges>,
    ) { }

    async create(dto: CreateCartridgeDto) {
        await this.repo.insert(dto);
    };
};
