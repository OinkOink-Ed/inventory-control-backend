// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Cartridges } from 'src/common/entities/cartridges';
// import { Repository } from 'typeorm';
// import { CreateCartridgeDto } from './dto/CreateCartridgeDto';
// import { Movements } from 'src/common/entities/movements';

// @Injectable()
// export class CartridgesService {
//   constructor(
//     @InjectRepository(Cartridges)
//     private readonly repoCartridges: Repository<Cartridges>,
//     @InjectRepository(Movements)
//     private readonly repoMovements: Repository<Movements>,
//   ) {}

//   async create(dto: CreateCartridgeDto) {
//     return await this.repoCartridges.insert(dto);
//   }
// }
