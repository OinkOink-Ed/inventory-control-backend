import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cartridge } from 'src/common/entities/Cartridge';
// import { Movement } from 'src/common/entities/Movement';
import { CartridgesController } from 'src/Modules/cartridge/cartridge.controller';
import { CartridgesService } from 'src/Modules/cartridge/cartridge.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cartridge])],
  controllers: [CartridgesController],
  providers: [CartridgesService],
})
export class CartridgeModule {}
