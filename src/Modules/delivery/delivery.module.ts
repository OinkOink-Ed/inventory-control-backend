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
import { UserModule } from '@Modules/user/user.module';
import { AccessControlModule } from '@Modules/access-control/access-control.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Delivery, CartridgeDelivery]),
    UserModule,
    CartridgeModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    AccessControlModule,
  ],
  controllers: [DeliveryController],
  providers: [DeliveryService, MapperProfile],
})
export class DeliveryModule {}
