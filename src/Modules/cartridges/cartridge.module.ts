import { Module } from '@nestjs/common';
import { CartridgeController } from './cartridges.controller';
import { CartridgesService } from './cartridges.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cartridge } from 'src/common/entities/cartridge';

@Module({
  imports: [TypeOrmModule.forFeature([Cartridge])],
  controllers: [CartridgeController],
  providers: [CartridgesService]
})
export class CartridgeModule { }
