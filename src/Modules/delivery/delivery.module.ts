import { Module } from '@nestjs/common';
import { DeliveryController } from './delivery.controller';
import { DeliveryService } from './delivery.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delivery } from 'src/common/entities/Delivery';
import { CartridgeDelivery } from 'src/common/entities/CartridgeDelivery';

@Module({
  imports: [TypeOrmModule.forFeature([Delivery, CartridgeDelivery])],
  controllers: [DeliveryController],
  providers: [DeliveryService],
})
export class DeliveryModule {}
