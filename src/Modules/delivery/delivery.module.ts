import { Module } from '@nestjs/common';
import { DeliveryController } from './delivery.controller';
import { DeliveryService } from './delivery.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delivery } from 'src/Modules/delivery/entities/Delivery';
import { CartridgeDelivery } from 'src/Modules/delivery/entities/CartridgeDelivery';
import { CartridgeModel } from 'src/Modules/cartridgeModel/entities/CartridgeModel';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { MapperProfile } from 'src/common/MapperProfile';

@Module({
  imports: [
    TypeOrmModule.forFeature([Delivery, CartridgeDelivery]),
    CartridgeModel,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
  controllers: [DeliveryController],
  providers: [DeliveryService, MapperProfile],
})
export class DeliveryModule {}
