import { Module } from '@nestjs/common';
import { CartridgeController } from './cartridges.controller';
import { CartridgesService } from './cartridges.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cartridges } from 'src/common/entities/cartridges';

@Module({
  imports: [TypeOrmModule.forFeature([Cartridges])],
  controllers: [CartridgeController],
  providers: [CartridgesService]
})
export class CartridgeModule { }
