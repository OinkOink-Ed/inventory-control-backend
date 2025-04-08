import { Module } from '@nestjs/common';
import { DeliveryController } from './delivery.controller';
import { DeliveryService } from './delivery.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delivery } from 'src/Modules/delivery/entities/Delivery';
import { CartridgeDelivery } from 'src/Modules/delivery/entities/CartridgeDelivery';

@Module({
  imports: [TypeOrmModule.forFeature([Delivery, CartridgeDelivery])],
  controllers: [DeliveryController],
  providers: [DeliveryService],
})
export class DeliveryModule {}
