import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { Delivery } from '@Modules/delivery/entities/Delivery';
import { CartridgeDelivery } from '@Modules/delivery/entities/CartridgeDelivery';
import { CartridgeModule } from '@Modules/cartridge/cartridge.module';
import { DeliveryController } from '@Modules/delivery/delivery.controller';
import { DeliveryService } from '@Modules/delivery/delivery.service';
import { MapperProfile } from '@common/MapperProfile';

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
