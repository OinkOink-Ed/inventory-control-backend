import { Module } from '@nestjs/common';
import { ReceivingController } from './receiving.controller';
import { ReceivingService } from './receiving.service';
import { CartridgeReceiving } from 'src/Modules/receiving/entities/CartridgeReceiving';
import { Receiving } from 'src/Modules/receiving/entities/Receiving';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartridgeModule } from 'src/Modules/cartridge/cartridge.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { MapperProfile } from 'src/common/MapperProfile';

@Module({
  imports: [
    TypeOrmModule.forFeature([Receiving, CartridgeReceiving]),
    CartridgeModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
  controllers: [ReceivingController],
  providers: [ReceivingService, MapperProfile],
})
export class ReceivingModule {}
