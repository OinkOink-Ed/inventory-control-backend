import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { Receiving } from '@Modules/receiving/entities/Receiving';
import { CartridgeReceiving } from '@Modules/receiving/entities/CartridgeReceiving';
import { CartridgeModule } from '@Modules/cartridge/cartridge.module';
import { ReceivingController } from '@Modules/receiving/receiving.controller';
import { ReceivingService } from '@Modules/receiving/receiving.service';
import { MapperProfile } from '@common/MapperProfile';

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
