import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cartridge } from 'src/common/entities/cartridge';
import { Repository } from 'typeorm';
import { CreateCartridgeDto, CreatedResponseCartridgeDto } from './dto/CreateCartridgeDto';

@Injectable()
export class CartridgeService {
    constructor(
        @InjectRepository(Cartridge)
        private readonly repo: Repository<Cartridge>,
    ) { }

    async create(dto: CreateCartridgeDto): Promise<CreatedResponseCartridgeDto> {
        return await this.repo.save(dto);
    };
};
