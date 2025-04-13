import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cartridge } from 'src/Modules/cartridge/entities/Cartridge';
import { CartridgeController } from 'src/Modules/cartridge/cartridge.controller';
import { CartridgeService } from 'src/Modules/cartridge/cartridge.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cartridge])],
  controllers: [CartridgeController],
  providers: [CartridgeService],
  exports: [CartridgeService],
})
export class CartridgeModule {}
