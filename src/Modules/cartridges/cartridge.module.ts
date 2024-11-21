import { Module } from '@nestjs/common';
import { CartridgeController } from './cartridge.controller';
import { CartridgeService } from './cartridge.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cartridge } from 'src/common/entities/cartridge';

@Module({
  imports: [TypeOrmModule.forFeature([Cartridge])],
  controllers: [CartridgeController],
  providers: [CartridgeService]
})
export class CartridgeModule { }
