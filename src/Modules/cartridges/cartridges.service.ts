import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cartridges } from 'src/common/entities/cartridges';
import { EntityManager, Repository } from 'typeorm';
import {
  CreateCartridgeDto,
  CreateMovementsDto,
} from './dto/CreateCartridgeDto';
import { Movements } from 'src/common/entities/movements';
import { CartridgeModels } from 'src/common/entities/cartridgeModels';

@Injectable()
export class CartridgesService {
  constructor(
    @InjectRepository(Cartridges)
    private readonly repoCartridges: Repository<Cartridges>,
    @InjectRepository(Movements)
    private readonly repoMovements: Repository<Movements>,
    @InjectRepository(CartridgeModels)
    private readonly cartridgeModels: Repository<CartridgeModels>,
  ) {}

  async create(dto: CreateCartridgeDto) {
    await this.repoCartridges.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        for (let i = 0; i < dto.count; i++) {
          const entity = new Cartridges();
          const cartridgeModel = await transactionalEntityManager.findOne(
            CartridgeModels,
            { where: { modelName: dto.modelName.modelName } },
          );
          entity.modelName = cartridgeModel;
          await transactionalEntityManager.insert(Cartridges, entity);
        }
      },
    );

    const movementsDto: CreateMovementsDto = {
      count: dto.count,
      modelCartridge: dto.modelName.modelName,
      employee: dto.user,
      type: 'Reception',
    };

    await this.repoMovements.insert(movementsDto);
  }
}
