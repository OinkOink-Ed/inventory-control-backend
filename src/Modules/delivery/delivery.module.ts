import { Module } from '@nestjs/common';
import { DeliveryController } from './delivery.controller';
import { DeliveryService } from './delivery.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delivery } from 'src/Modules/delivery/entities/Delivery';
import { CartridgeDelivery } from 'src/Modules/delivery/entities/CartridgeDelivery';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { MapperProfile } from 'src/common/MapperProfile';
import { CartridgeModule } from 'src/Modules/cartridge/cartridge.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Delivery, CartridgeDelivery]),
    CartridgeModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
  controllers: [DeliveryController],
  providers: [DeliveryService, MapperProfile],
})
export class DeliveryModule {}
