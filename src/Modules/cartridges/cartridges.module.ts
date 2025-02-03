import { Module } from '@nestjs/common';
import { CartridgesController } from './cartridges.controller';
import { CartridgesService } from './cartridges.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cartridges } from 'src/common/entities/cartridges';
import { Movements } from 'src/common/entities/movements';
import { CartridgeModels } from 'src/common/entities/cartridgeModels';

@Module({
  imports: [TypeOrmModule.forFeature([Cartridges, Movements, CartridgeModels])],
  controllers: [CartridgesController],
  providers: [CartridgesService],
})
export class CartridgesModule {}
